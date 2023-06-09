import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Album Title',
  })
  title: string;
}
