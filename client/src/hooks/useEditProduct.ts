import { productsApi } from "../api/productService";

export const useEditProduct = () => {
  const [editProduct, { isLoading }] = productsApi.useEditProductMutation();

  return {
    isEditing: isLoading,
    editProduct,
  };
};
