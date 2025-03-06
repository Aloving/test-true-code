import { useCallback, useEffect, useState } from "react";

import { IProduct } from "../interface/IProduct";
import { IData } from "../interface/IData";

const dataToSet = [
  {
    id: "1",
    banner:
      "https://static.street-beat.ru/upload/resize_cache/iblock/1af/666_666_1/y4u4fqwdidibc6bdi3byscgan07u3siv.jpg",
    title: "New Balance 574",
    description: `New Balance 574 — классические беговые кроссовки, разработанные в 80-х
    годах прошлого века. Тогда они мгновенно завоевали популярность и до
    сих пор остаются ключевым силуэтом в классической линейке New Balance.
    В этой паре 574 использована натуральная замша и текстиль с плотным
    плетением. За амортизацию и стабилизацию при ходьбе отвечают
    межподошва из ЭВА с технологией ENCAP®, сочетающей мягкий внутренний
    материал и жесткий кант, удерживающий стопу.`,
    price: 19000,
    discount: 20,
    article: "ML574EVG",
  },
  {
    id: "2",
    banner:
      "https://static.street-beat.ru/upload/resize_cache/iblock/1af/666_666_1/y4u4fqwdidibc6bdi3byscgan07u3siv.jpg",
    title: "New Balance 574",
    description: `New Balance 574 — классические беговые кроссовки, разработанные в 80-х
    годах прошлого века. Тогда они мгновенно завоевали популярность и до
    сих пор остаются ключевым силуэтом в классической линейке New Balance.
    В этой паре 574 использована натуральная замша и текстиль с плотным
    плетением. За амортизацию и стабилизацию при ходьбе отвечают
    межподошва из ЭВА с технологией ENCAP®, сочетающей мягкий внутренний
    материал и жесткий кант, удерживающий стопу.`,
    price: 19000,
    discount: 20,
    article: "ML574EVG",
  },
  {
    id: "3",
    banner:
      "https://static.street-beat.ru/upload/resize_cache/iblock/1af/666_666_1/y4u4fqwdidibc6bdi3byscgan07u3siv.jpg",
    title: "New Balance 574",
    description: `New Balance 574 — классические беговые кроссовки, разработанные в 80-х
    годах прошлого века. Тогда они мгновенно завоевали популярность и до
    сих пор остаются ключевым силуэтом в классической линейке New Balance.
    В этой паре 574 использована натуральная замша и текстиль с плотным
    плетением. За амортизацию и стабилизацию при ходьбе отвечают
    межподошва из ЭВА с технологией ENCAP®, сочетающей мягкий внутренний
    материал и жесткий кант, удерживающий стопу.`,
    price: 19000,
    discount: 20,
    article: "ML574EVG",
  },
  {
    id: "4",
    banner:
      "https://static.street-beat.ru/upload/resize_cache/iblock/1af/666_666_1/y4u4fqwdidibc6bdi3byscgan07u3siv.jpg",
    title: "New Balance 574",
    description: `New Balance 574 — классические беговые кроссовки, разработанные в 80-х
    годах прошлого века. Тогда они мгновенно завоевали популярность и до
    сих пор остаются ключевым силуэтом в классической линейке New Balance.
    В этой паре 574 использована натуральная замша и текстиль с плотным
    плетением. За амортизацию и стабилизацию при ходьбе отвечают
    межподошва из ЭВА с технологией ENCAP®, сочетающей мягкий внутренний
    материал и жесткий кант, удерживающий стопу.`,
    price: 19000,
    discount: 20,
    article: "ML574EVG",
  },
];

const fakeLoad: (page?: number, offset?: number) => Promise<IProduct[]> = (
  page,
  offset
) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(dataToSet), 500);
  });

export const useProducts = (pageOffset: number) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData[]>([]);

  const loadMoreData = useCallback(
    (page: number) => {
      setLoading(() => false);
      if (loading) {
        return;
      }
      setLoading(true);

      fakeLoad(page, pageOffset).then((dataToSet) => {
        setData(
          dataToSet.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
        setLoading(() => false);
      });
    },
    [loading, pageOffset]
  );

  const onPageChange = (page: number) => {
    setPage(page);
    setLoading(false);
    loadMoreData(page);
  };

  useEffect(() => {
    loadMoreData(1);
  }, []);

  return {
    data,
    loading,
    setPage,
    loadMoreData,
    onPageChange,
  };
};
