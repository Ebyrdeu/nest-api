import { ForbiddenException } from '@/extra/exceptions';
import { DbService } from '@db/db.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { type AlbumToPhoto } from '@prisma/client';

@Injectable()
export class ExtraService {
  constructor(private db: DbService) {}

  async findOne(email: string) {
    return this.db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        photos: true,
        album: {
          select: {
            id: true,
            title: true,
            photos: true,
          },
        },
      },
    });
  }

  async savePhotoFromOtherUser(
    currentUserEmail: string,
    userId: string,
    photoId: string,
    otherUserEmail: string,
  ) {
    if (currentUserEmail === otherUserEmail) {
      throw new ForbiddenException();
    }

    const findOtherUserPhoto = await this.db.user.findFirst({
      where: {
        email: otherUserEmail,
      },
      select: {
        photos: {
          where: {
            id: +photoId,
          },
          select: {
            title: true,
            url: true,
            comment: true,
          },
        },
      },
    });
    if (!findOtherUserPhoto) return;

    const savePhoto = await this.db.photo.create({
      data: {
        ...findOtherUserPhoto['photos'][0],
        userId,
      },
    });
    return {
      status: HttpStatus.CREATED,
      data: savePhoto,
    };
  }

  async saveAlbumFromOtherUser(
    currentUserEmail: string,
    userId: string,
    albumId: string,
    otherUserEmail: string,
  ) {
    if (currentUserEmail === otherUserEmail) {
      throw new ForbiddenException();
    }

    const findOtherUserAlbum = await this.db.user.findUnique({
      where: {
        email: otherUserEmail,
      },
      select: {
        album: {
          where: {
            id: +albumId,
          },
          select: {
            title: true,
            photos: true,
          },
        },
      },
    });

    if (!findOtherUserAlbum) return;

    const { album }: { album: { photos: AlbumToPhoto[]; title: string }[] } = findOtherUserAlbum;

    const savedAlbumWithPhotos = await this.db.album.create({
      data: {
        userId,
        title: album[0].title,
        photos: {
          createMany: {
            skipDuplicates: true,
            data: album[0].photos.map(({ photoId }) => ({
              photoId: +photoId,
              assignedUser: userId,
            })),
          },
        },
      },
      select: {
        id: true,
        title: true,
        userId: true,
        photos: true,
      },
    });
    return {
      status: HttpStatus.CREATED,
      data: savedAlbumWithPhotos,
    };
  }
}
