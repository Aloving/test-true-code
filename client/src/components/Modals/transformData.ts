import { IData } from "../../interface/IData";
import { IProductForm, IProduct } from "../../interface/IProduct";

export const transformDataToForm = ({
  key,
  title,
  description,
  price,
  discount,
  article,
  photo,
}: IProduct): IProductForm => ({
  id: key,
  title,
  description,
  price: price + "",
  discount: discount + "",
  article,
  photo,
});

export const transformProductToData = (products: IProduct[] = []): IData[] =>
  products.map(({ id, ...product }) => ({
    ...product,
    key: id,
  }));
