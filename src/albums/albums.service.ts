import { AlbumDto, AlbumPhotoDto } from '@album/dto';
import { NotFoundAlbumException } from '@album/exceptions';
import { DbService } from '@db/db.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(private db: DbService) {}

  async getAllAlbums(userId: string) {
    const albums: Album[] = await this.db.album.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        userId: true,
      },
    });

    return {
      status: HttpStatus.OK,
      data: albums,
    };
  }

  async getAlbumById(userId: string, albumId: string) {
    const album = await this.db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        album: {
          where: {
            id: +albumId,
          },
        },
      },
    });
    return {
      status: HttpStatus.OK,
      data: album,
    };
  }

  async createNewAlbum(userId: string, dto: AlbumDto) {
    const newAlbum = await this.db.album.create({
      data: {
        ...dto,
        userId,
      },
    });
    return {
      status: HttpStatus.CREATED,
      data: newAlbum,
    };
  }

  async updateAlbum(userId: string, albumId: string, dto: AlbumDto) {
    const updatedAlbum = await this.db.album.updateMany({
      where: {
        id: +albumId,
        userId,
      },
      data: {
        ...dto,
      },
    });
    if (updatedAlbum.count === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Album with id ${albumId} doesn't exist in Database`,
        data: null,
      };
    }
    return {
      status: HttpStatus.OK,
      title: dto.title,
      id: +albumId,
      userId,
    };
  }

  async deleteAlbum(userId: string, albumId: string) {
    const deletedPhoto = await this.db.album.deleteMany({
      where: {
        id: +albumId,
        userId,
      },
    });

    if (deletedPhoto.count === 0) {
      throw new NotFoundAlbumException(albumId);
    }
    return {
      status: HttpStatus.OK,
      data: {
        status: 'success',
        data: null,
      },
    };
  }

  async addPhotoToAlbum(userId: string, albumId: string, { photo_id }: AlbumPhotoDto) {
    await this.db.albumToPhoto.createMany({
      skipDuplicates: true,
      data: photo_id.map((p_id) => ({
        albumId: +albumId,
        photoId: p_id,
        assignedUser: userId,
      })),
    });

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }

  async deletePhotoFromAlbum(userId: string, albumId: string, photoId: string) {
    await this.db.albumToPhoto.delete({
      where: {
        photoId_albumId: {
          photoId: +photoId,
          albumId: +albumId,
        },
      },
    });
    return {
      status: HttpStatus.OK,
      data: null,
    };
  }
}
