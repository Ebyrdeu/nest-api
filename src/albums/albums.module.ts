import { Module } from '@nestjs/common';
import { AlbumsController } from '@album/albums.controller';
import { AlbumsService } from '@album/albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
