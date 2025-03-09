import { productsApi } from "../api/productService";

export const useCreateProduct = () => {
  const [createProduct, { isLoading }] = productsApi.useCreateProductMutation();

  return {
    createProduct,
    isCreating: isLoading,
  };
};
