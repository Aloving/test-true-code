import { IData } from "../interface/IData";
import { IProductForm, IProduct } from "../interface/IProduct";

export const transformDataToForm = ({
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

export const transformProductToData = (products: IProduct[] = []): IData[] =>
  products.map(({ id, ...product }) => ({
    ...product,
    key: id,
  }));
