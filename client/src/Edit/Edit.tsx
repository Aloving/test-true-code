import { Typography, Table, TableColumnsType, Image, Button, Flex } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import { useProducts } from "../hooks/useProducts";

import { IData } from "../interface/IData";

const PAGE_OFFSET = 10;

export const Edit = () => {
  const { data, loading, setPage, loadMoreData, onPageChange } =
    useProducts(PAGE_OFFSET);

  const columns: TableColumnsType<IData> = [
    {
      title: "Фотография",
      dataIndex: "banner",
      width: 150,
      render: (banner) => (
        <Image src={banner} style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Название",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Описание",
      width: 400,
      dataIndex: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (description) => <Typography>{description}</Typography>,
    },
    {
      title: "Стоимость",
      dataIndex: "price",
      width: 200,
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <Flex
          style={{
            paddingLeft: 10,
          }}
        >
          <Typography>{price}</Typography>
        </Flex>
      ),
    },
    {
      title: "Стоимость со скидкой",
      dataIndex: "discount",
      width: 200,
      render: (discount, { price }) => (
        <Flex
          style={{
            paddingLeft: 10,
          }}
        >
          <Typography>{price - (price * discount) / 100}</Typography>
        </Flex>
      ),
    },
    {
      width: 200,
      render: () => (
        <Flex>
          <div
            style={{
              paddingRight: 8,
            }}
          >
            <Button icon={<EditOutlined />} type="text" />
          </div>
          <Button icon={<CloseOutlined />} type="text" />
        </Flex>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} />;
};
