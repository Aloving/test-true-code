import { IProduct, IProductForm } from "./IProduct";

export interface IGetProductsDto {
  search: string;
  searchFields: string[];
  sortField: string;
  sortOrder: string;
  offset: number;
  page: number;
}

export interface IPaginationData extends IGetProductsDto {
  total: number;
}

export interface IGetProductsResponseDto {
  total: number;
  page: number;
  take: number;
  search: string;
  sortField: string;
  sortOrder: string;
  searchFields: string[];
  data: IProduct[];
}

export interface IProductService {
  createProduct: (productForm: IProductForm | undefined) => Promise<IProduct>;
  deleteProductById: (id: string) => Promise<void>;
  editProduct: (productForm: IProductForm) => Promise<IProduct>;
  getProducts: (data: IGetProductsDto) => Promise<IGetProductsResponseDto>;
  getProductById: (id: string) => Promise<IProduct | null>;
}
