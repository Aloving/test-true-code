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
    const take = offset || DEFAULT_PAGE_OFFSET;
    const skip = take ? take * (page - 1) : take;

    const [result, total] = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.photo', 'photo')
      .where(
        'LOWER(product.title) like LOWER(:search) OR LOWER(product.description) like LOWER(:search)',
        {
          search: `%${search}%`,
        },
      )
      .take(take)
      .skip(skip)
      .cache(true)
      .getManyAndCount();

    return {
      total,
      page: +page,
      data: result,
      take: +take,
      search,
    };
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['photo'],
    });
  }

  async create({ photo, ...data }: ProductDto) {
    const productObj = this.productsRepository.create(data);
    const photoObj = this.photoRepository.create(photo);

    const product = await this.productsRepository.save({
      ...productObj,
      photo: photoObj,
    });

    return product;
  }

  async deleteById(id: string) {
    await this.productsRepository.delete(id);
  }
}
