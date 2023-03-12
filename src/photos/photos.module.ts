import { Module } from '@nestjs/common';
import { PhotosService } from '@photo/photos.service';
import { PhotosController } from '@photo/photos.controller';

@Module({
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
