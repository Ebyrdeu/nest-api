import { DbService } from '@db/db.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PhotosDto } from '@photo/dto';
import { NotFoundPhotoException } from '@photo/exceptions';
import { Photo } from '@prisma/client';

@Injectable()
export class PhotosService {
  constructor(private db: DbService) {}

  async getAllPhotos(userId: string) {
    const photos: Omit<Photo, 'userId'>[] = await this.db.photo.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        url: true,
        comment: true,
      },
    });

    return {
      status: HttpStatus.OK,
      data: photos,
    };
  }

  async getPhotoById(userId: string, photoId: string) {
    const photo = await this.db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        photos: {
          where: {
            id: +photoId,
          },
        },
      },
    });

    if (!photo)
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      data: photo,
    };
  }

  async createNewPhoto(userId: string, dto: PhotosDto) {
    const newPhoto = await this.db.photo.create({
      data: {
        ...dto,
        userId,
      },
    });

    return {
      status: HttpStatus.CREATED,
      data: newPhoto,
    };
  }

  async deletePhoto(userId: string, photoId: string) {
    const deletedPhoto = await this.db.photo.deleteMany({
      where: {
        id: +photoId,
        userId,
      },
    });

    if (deletedPhoto.count === 0) {
      throw new NotFoundPhotoException(photoId);
    }

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }
}
