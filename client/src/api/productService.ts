import axios from "axios";

import { IProductForm } from "../interface/IProduct";
import { IProductService } from "../interface/IProductService";
import { IGetProductsDto } from "../interface/IProductService";

const paginationExample = {
  search: "",
  sortField: "",
  sortOrder: "",
  offset: "10",
  page: "1",
} as IGetProductsDto;

export const productService: IProductService = {
  createProduct: (createProductDto: IProductForm | undefined) => {
    return axios
      .put("/api/products", createProductDto)
      .then(({ data }) => data);
  },
  editProduct: (editProductDto: IProductForm) => {
    return axios
      .patch("/api/products", editProductDto)
      .then(({ data }) => data);
  },
  getProducts: (getProductsDto: IGetProductsDto = paginationExample) => {
    const params = new URLSearchParams(Object.entries(getProductsDto));

    return axios
      .get("/api/products?" + params, {
        method: "GET",
      })
      .then(({ data }) => data);
  },
  getProductById: (id: string) => {
    return axios.get("/api/products" + `/${id}`).then(({ data }) => data);
  },
};
