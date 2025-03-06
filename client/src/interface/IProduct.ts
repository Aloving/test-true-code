export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  article: string;
}

// export type IProductForm = Omit<IProduct, "id">;
export interface IProductForm
  extends Omit<IProduct, "id" | "price" | "discount"> {
  id?: string;
  price: string | null;
  discount: string | null;
}
