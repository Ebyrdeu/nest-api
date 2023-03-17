import { GetCurrentUser } from '@auth/common/decorators';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhotosDto } from '@photo/dto';
import { PhotosService } from '@photo/photos.service';

@ApiTags('Photos')
@ApiBearerAuth('jwt-access')
@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get('/')
  @ApiResponse({
    schema: {
      example: {
        status: HttpStatus.OK,
        data: [
          {
            id: 42,
            title: 'Confetti Photo #1',
            url: 'h"https://images.unsplash.com/photo-1492684223066-81342ee5ff30"            ',
            comment: 'Confetti',
          },
          {
            id: 43,
            title: 'Confetti Photo #2',
            url: 'https://images.unsplash.com/photo-1481162854517-d9e353af153d',
            comment: 'Confetti #2',
          },
          {
            id: 44,
            title: 'Confetti Photo #3',
            url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            comment: 'Confetti #3',
          },
          {
            id: 45,
            title: 'Happy Photo',
            url: 'https://images.unsplash.com/photo-1454486837617-ce8e1ba5ebfe',
            comment: 'So happy',
          },
        ],
      },
    },
  })
  @ApiOperation({ summary: 'Get ALL current logged user photos' })
  getAllPhotos(@GetCurrentUser('id') userId: string) {
    return this.photosService.getAllPhotos(userId);
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
        status: HttpStatus.OK,
        data: {
          id: 42,
          title: 'Confetti Photo #1',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
          comment: 'Confetti',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Get Single current logged user photo by id' })
  getSinglePhotoById(@GetCurrentUser('id') userId, @Param() { id }: { id: string }) {
    return this.photosService.getPhotoById(userId, id);
  }

  @Post('/')
  @ApiResponse({
    schema: {
      example: {
        status: HttpStatus.CREATED,
        data: {
          title: 'Confetti Photo #1',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
          comment: 'Confetti',
          user_id: 4,
          id: 47,
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create Photo for current logged user' })
  createNewPhoto(@GetCurrentUser('id') userId: string, @Body() photoDto: PhotosDto) {
    return this.photosService.createNewPhoto(userId, photoDto);
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
        status: HttpStatus.OK,
        data: null,
      },
    },
  })
  @ApiNotFoundResponse({
    schema: {
      example: {
        statusCode: HttpStatus.NOT_FOUND,
        message:
          'You do have any photo with id 1, make sure to that you chose photos that you actually have on your' +
          ' account ',
      },
    },
  })
  @ApiOperation({ summary: 'Remove Single current logged user photo by id' })
  deletePhoto(@GetCurrentUser('id') userId: string, @Param() { id }: { id: string }) {
    return this.photosService.deletePhoto(userId, id);
  }
}
