export declare class ProductDto {
    title: string;
    description: string;
    banner: string;
    price: number;
    discount: number;
}
export declare class PaginationDto {
    page: number;
    offset: number;
    search: string;
    sortField: 'title' | 'description' | 'price' | 'discount';
    sortOrder: 'ASC' | 'DESC';
}
