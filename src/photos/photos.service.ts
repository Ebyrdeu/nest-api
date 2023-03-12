import { HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '@db/db.service';
import { PhotosDto } from '@photo/dto';
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
        commnet: true,
      },
    });

    return {
      status: HttpStatus.OK,
      data: photos,
    };
  }

  async getPhotoById(photoId: string) {
    const photo: Omit<Photo, 'userId'> = await this.db.photo.findUnique({
      where: {
        id: +photoId,
      },
      select: {
        id: true,
        title: true,
        url: true,
        commnet: true,
      },
    });

    return {
      status: HttpStatus.OK,
      data: photo,
    };
  }

  async createBewPhoto(userId: string, dto: PhotosDto) {
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

    if (deletedPhoto.count === 0)
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Photo with id ${photoId} doesn't exist in Database`,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }
}
