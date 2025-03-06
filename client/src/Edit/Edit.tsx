import {
  Typography,
  Table,
  TableColumnsType,
  Image,
  Button,
  Flex,
  Modal,
  Input,
} from "antd";
import { CloseOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

import { useProducts } from "../hooks/useProducts";
import { useModalAssetsContext } from "../Modals";
import { transformData } from "../Modals/transformData";
import { useTableAssets } from "../hooks/useTableAssets";
import styles from "./Edit.module.css";

import { IData } from "../interface/IData";

const PAGE_OFFSET = 10;

export const Edit = () => {
  const { data, loading } = useProducts(PAGE_OFFSET);
  const { deleteId, setModalData, setDeleteId, closeDeleteModal } =
    useModalAssetsContext();
  const { searchString, setSearchString } = useTableAssets();

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
      render: (values) => (
        <Flex>
          <div
            style={{
              paddingRight: 8,
            }}
          >
            <Button icon={<EditOutlined />} type="text" />
          </div>
          <Button
            icon={<CloseOutlined />}
            type="text"
            onClick={() => {
              setDeleteId(values.id);
            }}
          />
        </Flex>
      ),
    },
  ];

  return (
    <div>
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
        onChange={() => {
          console.log("asdasdasd");
        }}
        dataSource={data}
        onRow={(data) => {
          return {
            onClick: () => setModalData(transformData(data)),
          };
        }}
        columns={columns}
        loading={loading}
      />
      <Modal
        open={!!deleteId}
        onCancel={() => closeDeleteModal()}
        title="Вы уверены что хотите удалить?"
      />
    </div>
  );
};
