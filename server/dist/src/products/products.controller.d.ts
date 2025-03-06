import { ProductsService } from './products.service';
import { PaginationDto, ProductDto } from './dto/products.dto';
import { Product } from './entities/products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: PaginationDto): Promise<{
        total: number;
        page: number;
        data: Product[];
        search: string;
    }>;
    findById(id: string): Promise<Product | null>;
    createProduct(productObj: ProductDto): Promise<Product>;
}
