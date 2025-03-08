import { IProduct } from "./IProduct";

export interface IData extends Omit<IProduct, "id"> {
  key: string;
}
