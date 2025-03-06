import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNotEmpty()
  search: string;

  @ApiProperty({
    enum: ['title', 'description', 'price', 'discount'],
    example: 'title',
  })
  @IsInt()
  sortField: 'title' | 'description' | 'price' | 'discount';

  @ApiProperty({
    example: '',
  })
  @IsInt()
  sortOrder: 'ASC' | 'DESC';
}
