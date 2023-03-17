import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExtraDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '6a6b1278-c75d-4391-bdc4-6ead314ad303',
  })
  id: string;
}
