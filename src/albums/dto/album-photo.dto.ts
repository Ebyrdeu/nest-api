import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class AlbumPhotoDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [1],
  })
  photo_id: number[];
}
