import { IProductForm } from "./IProduct";

export interface ICreatingModal {
  modalData: IProductForm;
  deleteId: string;
  isModalShown: boolean;

  closeDeleteModal: () => void;
  resetModalData: () => void;
  setIsModalShown: (isShown: boolean) => void;
  setModalData: (data: IProductForm) => void;
  setDeleteId: (id: string) => void;
}
