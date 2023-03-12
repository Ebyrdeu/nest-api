import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumPhotoDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  photo_id: number[];
}
