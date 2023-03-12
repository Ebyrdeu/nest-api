import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotosService } from '@photo/photos.service';
import { GetCurrentUserId } from '@auth/common/decorators';
import { PhotosDto } from '@photo/dto';

@ApiTags('photos')
@ApiBearerAuth('jwt-access')
@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get('/')
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        data: [
          {
            id: 42,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
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
  getAllPhotos(@GetCurrentUserId() userId: string) {
    return this.photosService.getAllPhotos(userId);
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
          id: 42,
          title: 'Confetti Photo #1',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
          comment: 'Confetti',
        },
      },
    },
  })
  getSinglePhotoById(@Param() { id }: { id: string }) {
    return this.photosService.getPhotoById(id);
  }

  @Post('/')
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
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
  createNewPhoto(@GetCurrentUserId() userId: string, @Body() photoDto: PhotosDto) {
    return this.photosService.createBewPhoto(userId, photoDto);
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
        data: null,
      },
    },
  })
  deletePhoto(@GetCurrentUserId() userId: string, @Param() { id }: { id: string }) {
    return this.photosService.deletePhoto(userId, id);
  }
}
