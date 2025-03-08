import {
  Typography,
  Table,
  TableColumnsType,
  Image,
  Button,
  Flex,
  Modal,
  Input,
  Pagination,
} from "antd";
import { CloseOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

import { useProducts } from "../hooks/useProducts";
import { useModalAssetsContext } from "../Modals";
import { transformDataToForm } from "../Modals/transformData";
import { useTableAssets } from "../hooks/useTableAssets";
import styles from "./Edit.module.css";

import { IData } from "../interface/IData";
import { IPaginationData } from "../interface/IProductService";

const paginationExample = {
  searchFields: [],
  search: "",
  sortField: "",
  sortOrder: "",
  total: 0,
  offset: 3,
  page: 1,
} as IPaginationData;

export const Edit = () => {
  const { data, isLoading, pagination, setPage } =
    useProducts(paginationExample);
  const { deleteId, setModalData, setDeleteId, closeDeleteModal } =
    useModalAssetsContext();
  const { searchString, setSearchString } = useTableAssets();

  const columns: TableColumnsType<IData> = [
    {
      title: "Фотография",
      dataIndex: "photo",
      width: 150,
      render: (photo) => {
        console.log("photo", photo);
        return (
          photo && <Image src={photo.url} style={{ width: 50, height: 50 }} />
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
        pagination={false}
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
        dataSource={data}
        onRow={(data) => {
          return {
            onClick: () => setModalData(transformDataToForm(data)),
          };
        }}
        columns={columns}
        loading={isLoading}
      />
      <Modal
        open={!!deleteId}
        onCancel={() => closeDeleteModal()}
        title="Вы уверены что хотите удалить?"
      />
    </div>
  );
};
