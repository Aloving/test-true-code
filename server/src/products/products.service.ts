import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto, ProductDto } from './dto/products.dto';
import { Product } from './entities/products.entity';
import { Photo } from './entities/photo.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
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
    });
  }

  async createProduct({ photo, ...data }: ProductDto) {
    const productObj = this.productsRepository.create(data);
    const photoObj = this.photoRepository.create(photo);

    const prd = {
      ...productObj,
      photo: photoObj,
    };

    console.log('prd', prd);
    const product = await this.productsRepository.save({
      ...productObj,
      photo: photoObj,
    });

    return product;
  }
}
