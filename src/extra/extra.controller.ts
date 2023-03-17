import { GetCurrentUser, Public } from '@auth/common/decorators';
import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExtraService } from './extra.service';

@ApiTags('User Extra Features')
@ApiBearerAuth('jwt-access')
@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Get(':email')
  @ApiResponse({
    schema: {
      example: {
        email: 'exapmle@gmail.com',
        photos: [
          {
            id: 1,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            comment: 'Confetti',
            userId: 'e85f50bd-ebb7-4b3f-874c-dfbe25b12e84',
          },
          {
            id: 2,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            comment: 'Confetti',
            userId: 'e85f50bd-ebb7-4b3f-874c-dfbe25b12e84',
          },
          {
            id: 3,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            comment: 'Confetti',
            userId: 'e85f50bd-ebb7-4b3f-874c-dfbe25b12e84',
          },
          {
            id: 4,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            comment: 'Confetti',
            userId: 'e85f50bd-ebb7-4b3f-874c-dfbe25b12e84',
          },
          {
            id: 5,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            comment: 'Confetti',
            userId: 'e85f50bd-ebb7-4b3f-874c-dfbe25b12e84',
          },
          {
            id: 7,
            title: 'Confetti Photo #1',
            url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
            comment: 'Confetti',
            userId: 'e85f50bd-ebb7-4b3f-874c-dfbe25b12e84',
          },
        ],
        album: [
          {
            id: 3,
            title: 'Album Title',
            photos: [],
          },
          {
            id: 1,
            title: 'Album Titqwele',
            photos: [
              {
                photoId: 1,
                albumId: 1,
                assignedAt: '2023-03-15T10:24:22.425Z',
                updatedAt: '2023-03-15T10:24:22.425Z',
              },
            ],
          },
        ],
      },
    },
  })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
    description: 'Stored as string',
    schema: { example: 'exapmle@gmail.com' },
  })
  @ApiOperation({ summary: 'Check User data based on his email adress' })
  @Public()
  findOne(@Param('email') email: string) {
    return this.extraService.findOne(email);
  }

  @Post('/save/photo/:email/:photoId')
  @ApiParam({
    name: 'photoId',
    required: true,
    type: 'string',
    description: 'Targeted user photo id',
    schema: { example: 1 },
  })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
    description: 'Targeted user email',
    schema: { example: 'exapmle@gmail.com' },
  })
  @ApiOperation({ summary: 'Save Album with Photos from targeted user to logged user' })
  @ApiResponse({
    schema: {
      example: {
        status: HttpStatus.CREATED,
        data: {
          id: 18,
          title: 'Confetti Photo #1',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
          comment: 'Confetti',
          userId: '43b9a226-64b4-4d82-9dbe-5e611573cf21',
        },
      },
    },
  })
  savePhotoFromOtherUser(
    @GetCurrentUser('email') currentUserEmail: string,
    @GetCurrentUser('id') userId,
    @Param() { photoId, email }: Record<any, string>,
  ) {
    return this.extraService.savePhotoFromOtherUser(currentUserEmail, userId, photoId, email);
  }

  @Post('/save/album/:email/:albumId')
  @ApiParam({
    name: 'albumId',
    required: true,
    type: 'string',
    description: 'Targeted user album',
    schema: { example: 1 },
  })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
    description: 'Targeted user email',
    schema: { example: 'exapmle@gmail.com' },
  })
  @ApiOperation({ summary: 'Save Album with Photos from targeted user to current logged user' })
  @ApiResponse({
    schema: {
      example: {
        status: HttpStatus.CREATED,
        data: {
          id: 6,
          title: 'Album Title',
          userId: 'cacb21bb-4c10-4800-91ba-c19702073ac4',
          photos: [
            {
              photoId: 2,
              albumId: 6,
              assignedUser: 'cacb21bb-4c10-4800-91ba-c19702073ac4',
              assignedAt: '2023-03-15T13:11:07.755Z',
              updatedAt: '2023-03-15T13:11:07.755Z',
            },
            {
              photoId: 7,
              albumId: 6,
              assignedUser: 'cacb21bb-4c10-4800-91ba-c19702073ac4',
              assignedAt: '2023-03-15T13:11:07.755Z',
              updatedAt: '2023-03-15T13:11:07.755Z',
            },
          ],
        },
      },
    },
  })
  saveAlbumFromOtherUser(
    @GetCurrentUser('email') currentUserEmail: string,
    @GetCurrentUser('id') userId: string,
    @Param() { albumId, email }: Record<any, string>,
  ) {
    return this.extraService.saveAlbumFromOtherUser(currentUserEmail, userId, albumId, email);
  }
}
