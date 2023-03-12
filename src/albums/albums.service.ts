import { HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '@db/db.service';
import { Album } from '@prisma/client';
import { AlbumDto, AlbumPhotoDto } from '@album/dto';

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

  async getAlbumById(albumId: string) {
    const album: Omit<Album, 'userId'> = await this.db.album.findUnique({
      where: {
        id: +albumId,
      },
      select: {
        id: true,
        title: true,
        photos: true,
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
    const updatedAlubm = await this.db.album.updateMany({
      where: {
        id: +albumId,
        userId,
      },
      data: {
        ...dto,
      },
    });
    if (updatedAlubm.count === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Album with id ${albumId} doesn't exist in Database`,
        data: null,
      };
    }
    return {
      status: HttpStatus.OK,
      data: {
        title: dto.title,
        id: +albumId,
        userId,
      },
    };
  }

  async deleteAlbum(userId: string, albumId: string) {
    const deletedPhoto = await this.db.album.deleteMany({
      where: {
        id: +albumId,
        userId,
      },
    });

    if (deletedPhoto.count === 0)
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Album with id ${albumId} doesn't exist in Database`,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      data: {
        status: 'success',
        data: null,
      },
    };
  }

  async addPhotoToAlbum(userId: string, albumId: string, { photo_id }: AlbumPhotoDto) {
    photo_id.map(async (p_id) => {
      await this.db.album.update({
        where: {
          id: +albumId,
        },
        data: {
          userId,
          photos: {
            connect: {
              id: p_id,
            },
          },
        },
      });
    });

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }

  async deletePhotoFromAlbum(userId: string, albumId: string, photoId: string) {
    await this.db.album.update({
      where: {
        id: +albumId,
      },
      data: {
        userId,
        photos: {
          disconnect: {
            id: +photoId,
          },
        },
      },
    });
    return {
      status: HttpStatus.OK,
      data: null,
    };
  }
}
