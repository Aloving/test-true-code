import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct, IProductForm } from "../interface/IProduct";
import { IGetProductsResponseDto } from "../interface/IProductService";
import { IGetProductsDto } from "../interface/IProductService";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    createProduct: build.mutation<IProduct, IProductForm>({
      query: (body) => ({
        url: "/products",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    getProducts: build.query<IGetProductsResponseDto, IGetProductsDto>({
      query: (body) => {
        const params = new URLSearchParams(Object.entries(body));

        return {
          url: "/products?" + params,
          method: "GET",
        };
      },
      transformResponse: (response: IGetProductsResponseDto) => ({
        ...response,
        data: response.data.map((item) => ({ ...item, key: item.id })),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              "Product",
            ]
          : ["Product"],
    }),
    getProduct: build.query<IProduct, string>({
      query: (id) => ({
        url: "/products" + `/${id}`,
        method: "GET",
      }),
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: "/products" + `/${id}`,
        method: "delete",
      }),
      invalidatesTags: () => [{ type: "Product" }],
    }),
    editProduct: build.mutation<IProduct, IProductForm>({
      query: (body) => {
        return {
          url: "/products",
          method: "patch",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});
