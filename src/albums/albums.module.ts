import { AlbumsController } from '@album/albums.controller';
import { AlbumsService } from '@album/albums.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
