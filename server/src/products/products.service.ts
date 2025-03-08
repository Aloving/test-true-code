import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto, ProductDto } from './dto/products.dto';
import { Product } from './entities/products.entity';
import { Photo } from './entities/photo.entity';

import { DEFAULT_PAGE_OFFSET, DEFAULT_PAGE_NUMBER } from '../constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async findAll({
    page = DEFAULT_PAGE_NUMBER,
    offset = DEFAULT_PAGE_OFFSET,
    sortField = '',
    sortOrder = '',
    search = '',
    searchFields = [],
  }: PaginationDto) {
    const orderField = sortField
      ? {
          [sortField]: sortOrder,
        }
      : {};
    const fields = search
      ? Object.fromEntries(
          new Map(searchFields.map((field) => [field, search])),
        )
      : {};
    const take = offset || DEFAULT_PAGE_OFFSET;
    const skip = take ? take * (page - 1) : take;

    const [result, total] = await this.productsRepository.findAndCount({
      take,
      skip,
      order: orderField,
      where: fields,
      relations: ['photo'],
    });

    return {
      total,
      page: +page,
      data: result,
      // data: result.map((item) => ({...item, photo: {...item.photo, url: ""}})),
      take: +take,
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

    const product = await this.productsRepository.save({
      ...productObj,
      photo: photoObj,
    });

    return product;
  }
}
