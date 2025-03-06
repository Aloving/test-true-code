import { useCallback, useState } from "react";

import { IProductForm } from "../interface/IProduct";

const initialValues = {
  title: "",
  description: "",
  article: "",
  price: null,
  discount: null,
};

export const useModalAssets = () => {
  const [selectedProduct, setProduct] = useState<IProductForm>(initialValues);
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
    setProduct(() => initialValues);
  }, []);

  return {
    isModalShown: deleteId ? false : isModalShown,
    modalData: selectedProduct,
    deleteId,
    setDeleteId,
    resetModalData,
    // setDelitingId,
    closeDeleteModal,
    setModalData,
    setIsModalShown,
  };
};
