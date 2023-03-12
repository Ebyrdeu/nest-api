import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { DbModule } from '@db/db.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '@auth/common/guards';
import { PhotosModule } from '@photo/photos.module';
import { AlbumsModule } from '@album/albums.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DbModule,
    PhotosModule,
    AlbumsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
