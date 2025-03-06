import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto, ProductDto } from './dto/products.dto';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async findAll({ page, offset, sortField, sortOrder, search }: PaginationDto) {
    const fields = search
      ? Object.fromEntries(
          new Map(
            ['title', 'description', 'banner', 'price', 'discount'].map(
              (field) => [field, search],
            ),
          ),
        )
      : null;
    const take = offset || 0;
    const skip = take ? take * (page - 1) : take;

    const [result, total] = await this.productsRepository.findAndCount({
      take,
      skip,
      order: {
        [sortField]: sortOrder,
      },
      where: fields || {},
    });

    return {
      total: Math.ceil(total / offset) - 1,
      page: +page,
      data: result,
      search,
    };
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['pictures', 'sizes'],
    });
  }

  async createProduct(data: ProductDto) {
    const productObj = this.productsRepository.create(data);

    console.log('productObj, ', productObj);
    const product = await this.productsRepository.save(productObj);

    return await this.productsRepository.save(product);
  }
}
