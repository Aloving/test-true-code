import { useMemo } from "react";
import { Flex, Typography, Table, Image, Input, Pagination } from "antd";
import type { TableColumnsType } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useProducts } from "../hooks/useProducts";
import { useTableAssets } from "../hooks/useTableAssets";

import styles from "./Catalog.module.css";

import { IData } from "../interface/IData";
import { IPaginationData } from "../interface/IProductService";
import { IPhoto } from "../interface/IPhoto";

const PAGE_OFFSET = 5;
const paginationExample = {
  searchFields: [],
  search: "",
  sortField: "",
  sortOrder: "",
  total: 0,
  offset: PAGE_OFFSET,
  page: 1,
} as IPaginationData;

export const Catalog = () => {
  const { setSearchString, searchString } = useTableAssets();
  const { setPage, pagination, data, isLoading } =
    useProducts(paginationExample);

  const columns: TableColumnsType<IData> = [
    {
      title: "Фотография",
      dataIndex: "photo",
      render: (photo) => {
        return (
          photo && <Image src={photo.url} style={{ width: 200, height: 200 }} />
        );
      },
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
        loading={isLoading}
        bordered
        footer={() => (
          <Flex justify="end">
            <Pagination
              pageSize={pagination.offset}
              total={pagination.total}
              onChange={(pageNum) => {
                setPage(pageNum);
              }}
            />
          </Flex>
        )}
        pagination={false}
        dataSource={data}
        onChange={({ current }) => {
          setPage(current || 1);
        }}
      />
    </Flex>
  );
};
