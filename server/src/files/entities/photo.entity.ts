import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Photo {
  @ApiProperty({
    example: '',
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  filename: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  type: string;
}
