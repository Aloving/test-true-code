import { IPhoto } from "./IPhoto";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  article: string;
  photo: IPhoto;
}

export interface IProductForm
  extends Omit<IProduct, "id" | "price" | "discount" | "banner"> {
  id?: string;
  banner: File | IPhoto;
  price: string | null;
  discount: string | null;
}
