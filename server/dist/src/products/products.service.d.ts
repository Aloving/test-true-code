import { Repository } from 'typeorm';
import { PaginationDto, ProductDto } from './dto/products.dto';
import { Product } from './entities/products.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll({ page, offset, sortField, sortOrder, search }: PaginationDto): Promise<{
        total: number;
        page: number;
        data: Product[];
        search: string;
    }>;
    findById(id: string): Promise<Product | null>;
    createProduct(data: ProductDto): Promise<Product>;
}
