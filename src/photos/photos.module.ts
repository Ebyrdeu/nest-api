import { Module } from '@nestjs/common';
import { PhotosController } from '@photo/photos.controller';
import { PhotosService } from '@photo/photos.service';

@Module({
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
