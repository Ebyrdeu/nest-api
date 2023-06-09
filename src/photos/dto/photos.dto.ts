import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PhotosDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Confetti Photo #1',
  })
  title: string;
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
  })
  url: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Confetti',
  })
  comment: string;
}
