import { useState } from "react";

import { productsApi } from "../api/productService";
import { FILTER_FIELDS } from "../constants/fields";

import { IPaginationData } from "../interface/IProductService";

export const useProducts = (initialValues: IPaginationData) => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(initialValues);
  const { data, isLoading } = productsApi.useGetProductsQuery({
    ...pagination,
    search,
    searchFields: FILTER_FIELDS,
  });
  const [deleteProduct] = productsApi.useDeleteProductMutation();
  const [createProduct] = productsApi.useCreateProductMutation();

  const setPage = (pageNum: number) => {
    setPagination({ ...pagination, page: pageNum });
  };

  return {
    data: data?.data,
    offset: pagination.offset,
    isLoading,
    total: data?.total,
    search,

    createProduct,
    deleteProduct,
    setSearch,
    setPage,
  };
};
