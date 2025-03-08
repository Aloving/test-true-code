import { useEffect, useState } from "react";

import { productService } from "../api/productService";
import { IGetProductsDto } from "../interface/IProductService";

const paginationExample = {
  search: "",
  sortField: "",
  sortOrder: "",
  offset: "10",
  page: "1",
} as IGetProductsDto;

export const useCreateProduct = () => {
  const [pagination, setPagination] = useState(paginationExample);

  console.log("pagination", pagination);

  useEffect(() => {
    productService.getProducts(pagination).then((res) => {
      console.log("res", res);
    });
  }, []);
};
