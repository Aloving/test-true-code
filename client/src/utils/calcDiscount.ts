export const calcDiscount = (price: number, discount: number) => {
  return Number(price - (price * discount) / 100).toFixed(2);
};
