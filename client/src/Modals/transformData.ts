import { IData } from "../interface/IData";
import { IProductForm } from "../interface/IProduct";

export const transformData = ({
  id,
  title,
  description,
  price,
  discount,
  article,
}: IData): IProductForm => ({
  id,
  title,
  description,
  price: price + "",
  discount: discount + "",
  article,
});
