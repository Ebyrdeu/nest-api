import { AlbumsService } from '@album/albums.service';
import { AlbumDto, AlbumPhotoDto } from '@album/dto';
import { GetCurrentUser } from '@auth/common/decorators';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Albums')
@ApiBearerAuth('jwt-access')
@Controller('albums')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  @ApiResponse({
    schema: {
      example: {
        status: HttpStatus.OK,
        data: {
          status: HttpStatus.OK,
          data: [
            {
              id: 17,
              title: 'Confetti Album user_id: 4 ',
            },
            {
              id: 18,
              title: 'Happy Album user_id: 4',
            },
          ],
        },
      },
    },
  })
  @ApiOperation({ summary: 'Get ALL current logged user albums' })
  getAllAlbums(@GetCurrentUser('id') userId: string) {
    return this.albumService.getAllAlbums(userId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
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
  @ApiOperation({ summary: 'Get Single current logged user album by id' })
  getAlbumById(@GetCurrentUser('id') userId: string, @Param() { id }: { id: string }) {
    return this.albumService.getAlbumById(userId, id);
  }

  @Post()
  @ApiResponse({
    schema: {
      example: {
        status: HttpStatus.CREATED,
        data: {
          title: 'Confetti Album',
          user_id: 4,
          id: 17,
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create Single current logged user album' })
  createNewAlbum(@GetCurrentUser('id') userId: string, @Body() dto: AlbumDto) {
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
        status: HttpStatus.CREATED,
        data: {
          title: "Confetti'R'Us",
          user_id: 4,
          id: 17,
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update Single current logged user album by id' })
  updateAlbum(
    @GetCurrentUser('id') userId: string,
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
  @ApiOperation({ summary: 'Delete Single current logged user album by id' })
  deleteAlbum(@GetCurrentUser('id') userId: string, @Param() { id }: { id: string }) {
    return this.albumService.deleteAlbum(userId, id);
  }

  @Post(':albumId/photos/')
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
  @ApiNotFoundResponse({
    schema: {
      example: {
        statusCode: HttpStatus.NOT_FOUND,
        message:
          'You do have any album with id 1, make sure to that you chose photos that you actually have on your' +
          ' account ',
      },
    },
  })
  @ApiOperation({ summary: 'Create Multi photos in a single album for current logged user' })
  addPhotoToAlbum(
    @GetCurrentUser('id') userId: string,
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
  @ApiOperation({ summary: 'Delete Delete single in a single album for current logged user' })
  deletePhotoFromAlbum(
    @GetCurrentUser('id') userId: string,
    @Param() { albumId, photoId }: Record<any, string>,
  ) {
    return this.albumService.deletePhotoFromAlbum(userId, albumId, photoId);
  }
}
