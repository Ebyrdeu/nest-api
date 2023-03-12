import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Album Title',
  })
  title: string;
}
