import { Flex, Typography, Table, Image, Input, Pagination } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router";
import { SearchOutlined } from "@ant-design/icons";

import { useProducts } from "../../hooks/useProducts";
import { calcDiscount } from "../../utils/calcDiscount";
import styles from "./Catalog.module.css";

import { IPaginationData } from "../../interface/IProductService";
import { IProduct } from "../../interface/IProduct";

const PAGE_OFFSET = 5;
const paginationExample = {
  sortField: "",
  sortOrder: "",
  offset: PAGE_OFFSET,
  page: 1,
} as IPaginationData;

export const Catalog = () => {
  const { data, total, offset, search, isLoading, setPage, setSearch } =
    useProducts(paginationExample);
  const navigate = useNavigate();

  const columns: TableColumnsType<IProduct> = [
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
      sorter: (a, b) => a.title.localeCompare(b.title),
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
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Стоимость со скидкой",
      dataIndex: "discount",
      render: (discount, { price }) => calcDiscount(price, discount),
    },
  ];

  return (
    <Flex className={styles.root}>
      <div>
        <Input
          className={styles.searchField}
          prefix={<SearchOutlined />}
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value as string)}
        />
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        bordered
        footer={() => (
          <Flex justify="end">
            <Pagination
              pageSize={offset}
              total={total}
              onChange={(pageNum) => setPage(pageNum)}
            />
          </Flex>
        )}
        onRow={({ id }) => ({
          onClick: () => navigate("/product" + `/${id}`),
        })}
        pagination={false}
        dataSource={data}
        onChange={({ current }) => {
          setPage(current || 1);
        }}
      />
    </Flex>
  );
};
