import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Photo } from '../../files/entities/photo.entity';

export class ProductDto {
  @ApiProperty({
    example: "Men's sneakers",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'New sneakers, autumn brand #321',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'New sneakers, autumn brand #321',
  })
  @IsString()
  banner: string;

  @ApiProperty({
    example: 3100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 25,
  })
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  photo: Photo;
}

export class PaginationDto {
  @ApiProperty({
    description: 'Номер пагинации',
    example: 1,
  })
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    description: 'Размер страницы',
    example: 10,
  })
  @IsNotEmpty()
  offset: number;

  @ApiProperty({
    description: 'Строка поиска',
    example: '',
  })
  search: string;

  @ApiProperty({ description: 'Поле для поиска', example: '' })
  searchFields: string[];

  @ApiProperty({
    description: 'Поле сортировки',
    example: '',
  })
  sortField: string;

  @ApiProperty({
    description: 'Порядок сортировки',
    example: '',
  })
  sortOrder: 'ASC' | 'DESC' | '';
}
