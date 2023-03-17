import { AlbumsModule } from '@album/albums.module';
import { AuthModule } from '@auth/auth.module';
import { AtGuard } from '@auth/common/guards';
import { DbModule } from '@db/db.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PhotosModule } from '@photo/photos.module';
import { ExtraModule } from './extra/extra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DbModule,
    PhotosModule,
    AlbumsModule,
    ExtraModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
