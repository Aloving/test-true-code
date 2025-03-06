import { useMemo } from "react";
import { Flex, Typography, Table, Image, Input } from "antd";
import type { TableColumnsType } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useProducts } from "../hooks/useProducts";
import { useTableAssets } from "../hooks/useTableAssets";

import styles from "./Catalog.module.css";

import { IData } from "../interface/IData";

const PAGE_OFFSET = 3;

export const Catalog = () => {
  const { setSearchString, searchString } = useTableAssets();
  const { setPage, loadMoreData, loading, data } = useProducts(PAGE_OFFSET);
  const readyData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        key: item.id,
      })),
    [data]
  );
  const columns: TableColumnsType<IData> = [
    {
      title: "Фотография",
      dataIndex: "banner",
      render: (banner) => (
        <Image src={banner} style={{ width: 200, height: 200 }} />
      ),
    },
    {
      title: "Название",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Описание",
      dataIndex: "description",
      render: (description) => (
        <Flex justify="center" align="center">
          <Typography>{description}</Typography>
        </Flex>
      ),
    },
    {
      title: "Стоимость",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Стоимость со скидкой",
      dataIndex: "discount",
      render: (discount, { price }) => price - (price * discount) / 100,
    },
  ];

  return (
    <Flex className={styles.root}>
      <div>
        <Input
          className={styles.searchField}
          prefix={<SearchOutlined />}
          placeholder="Поиск"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value as string)}
        />
      </div>
      <Table
        columns={columns}
        loading={loading}
        bordered
        pagination={{
          pageSize: PAGE_OFFSET,
        }}
        dataSource={readyData}
        onChange={({ current }) => {
          loadMoreData(current || 1);
          setPage(current || 1);
        }}
      />
    </Flex>
  );
};
