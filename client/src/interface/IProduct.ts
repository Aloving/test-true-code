import { IPhoto } from "./IPhoto";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  article: string;
  photo: IPhoto;

  key?: string;
}

export interface IProductForm
  extends Omit<IProduct, "id" | "price" | "discount" | "photo"> {
  id?: string;
  photo?: IPhoto;
  price: string | null;
  discount: string | null;
}
