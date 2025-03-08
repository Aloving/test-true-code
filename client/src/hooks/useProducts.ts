import { useEffect, useState } from "react";

import { productService } from "../api/productService";

import { transformProductToData } from "../Modals/transformData";

import { IPaginationData } from "../interface/IProductService";
import { IData } from "../interface/IData";

export const useProducts = (initialValues: IPaginationData) => {
  const [pagination, setPagination] = useState(initialValues);
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = (pagination: IPaginationData) => {
    setIsLoading(() => true);

    return productService
      .getProducts(pagination)
      .then((res) => {
        if (res) {
          const { data, take, page, ...pagination } = res;

          setPagination({
            ...pagination,
            offset: take,
            page: page,
          });
          setData(transformProductToData(data));
        }
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  };

  const setPage = (pageNum: number) => {
    getProducts({ ...pagination, page: pageNum });
  };

  useEffect(() => {
    getProducts(initialValues);
  }, []);

  return {
    data,
    pagination,
    isLoading,
    total: pagination,
    setPage,
  };
};
