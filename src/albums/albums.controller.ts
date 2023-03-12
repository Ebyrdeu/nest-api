import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@auth/common/decorators';
import { AlbumsService } from '@album/albums.service';
import { AlbumDto, AlbumPhotoDto } from '@album/dto';

@ApiTags('albums')
@ApiBearerAuth('jwt-access')
@Controller('albums')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: {
          status: 'success',
          data: [
            {
              id: 17,
              title: 'Confetti Album',
              user_id: 4,
            },
            {
              id: 18,
              title: 'Happy Album',
              user_id: 4,
            },
          ],
        },
      },
    },
  })
  getAllAlbums(@GetCurrentUserId() userId: string) {
    return this.albumService.getAllAlbums(userId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Stored as integer',
    schema: { example: 1 },
  })
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: {
          status: 'success',
          data: {
            id: 17,
            title: 'Confetti Album',
            photos: [
              {
                id: 42,
                title: 'Confetti Photo #1',
                url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
                comment: 'Confetti',
                user_id: 4,
              },
              {
                id: 43,
                title: 'Confetti Photo #2',
                url: 'https://images.unsplash.com/photo-1481162854517-d9e353af153d',
                comment: 'Confetti #2',
                user_id: 4,
              },
              {
                id: 44,
                title: 'Confetti Photo #3',
                url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
                comment: 'Confetti #3',
                user_id: 4,
              },
            ],
          },
        },
      },
    },
  })
  getAlbumById(@Param() { id }: { id: string }) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: {
          status: 'success',
          data: {
            title: 'Confetti Album',
            user_id: 4,
            id: 17,
          },
        },
      },
    },
  })
  createNewAlbum(@GetCurrentUserId() userId: string, @Body() dto: AlbumDto) {
    return this.albumService.createNewAlbum(userId, dto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Stored as integer',
    schema: { example: 1 },
  })
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: {
          status: 'success',
          data: {
            title: "Confetti'R'Us",
            user_id: 4,
            id: 17,
          },
        },
      },
    },
  })
  updateAlbum(
    @GetCurrentUserId() userId: string,
    @Body() dto: AlbumDto,
    @Param() { id }: { id: string },
  ) {
    return this.albumService.updateAlbum(userId, id, dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Stored as integer',
    schema: { example: 1 },
  })
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: {
          status: 'success',
          data: null,
        },
      },
    },
  })
  deleteAlbum(@GetCurrentUserId() userId: string, @Param() { id }: { id: string }) {
    return this.albumService.deleteAlbum(userId, id);
  }

  @Patch(':albumId/photos/')
  @ApiParam({
    name: 'albumId',
    required: true,
    description: 'Stored as integer',
    schema: { example: 1 },
  })
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: null,
      },
    },
  })
  addPhotoToAlbum(
    @GetCurrentUserId() userId: string,
    @Param() { albumId }: { albumId: string },
    @Body() dto: AlbumPhotoDto,
  ) {
    return this.albumService.addPhotoToAlbum(userId, albumId, dto);
  }

  @Delete(':albumId/photos/:photoId')
  @ApiParam({
    name: 'albumId',
    required: true,
    type: Number,
    description: 'Stored as integer',
    schema: { example: 1 },
  })
  @ApiParam({
    name: 'photoId',
    required: true,
    type: Number,
    description: 'Stored as integer',
    schema: { example: 1 },
  })
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: {
          status: 'success',
          data: null,
        },
      },
    },
  })
  deletePhotoFromAlbum(
    @GetCurrentUserId() userId: string,
    @Param() { albumId, photoId }: Record<any, string>,
  ) {
    return this.albumService.deletePhotoFromAlbum(userId, albumId, photoId);
  }
}
