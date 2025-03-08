import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { PaginationDto, ProductDto } from './dto/products.dto';
import { Product } from './entities/products.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Просмотр продуктов',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.productsService.findAll(query);
  }

  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Получить продукт по id',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }

  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Создать продукт',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  async createProduct(@Body() productObj: ProductDto) {
    return await this.productsService.createProduct(productObj);
  }
}
