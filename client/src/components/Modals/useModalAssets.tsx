import { useCallback, useState } from "react";

import { initialProductValues } from "../../constants/initialValues";

import { IProductForm } from "../../interface/IProduct";

export const useModalAssets = () => {
  const [selectedProduct, setProduct] =
    useState<IProductForm>(initialProductValues);
  const [isModalShown, setIsModalShown] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const setModalData = useCallback(
    (data: IProductForm) => {
      setIsModalShown(() => true);
      setProduct(() => data);
    },
    [setIsModalShown, setProduct]
  );
  const closeDeleteModal = useCallback(() => {
    setDeleteId("");
    setIsModalShown(() => false);
  }, [setDeleteId, setIsModalShown]);

  const resetModalData = useCallback(() => {
    setIsModalShown(() => false);
    setProduct(() => initialProductValues);
  }, []);

  return {
    isModalShown: deleteId ? false : isModalShown,
    modalData: selectedProduct,
    deleteId,
    setDeleteId,
    resetModalData,
    closeDeleteModal,
    setModalData,
    setIsModalShown,
  };
};
