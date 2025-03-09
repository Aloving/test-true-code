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

import { calcDiscount } from "../../utils/calcDiscount";
import { useProducts } from "../../hooks/useProducts";
import { useModalAssetsContext } from "../Modals";
import { transformDataToForm } from "../Modals/transformData";
import styles from "./Edit.module.css";

import { IPaginationData } from "../../interface/IProductService";
import { IProduct } from "../../interface/IProduct";

const PAGE_OFFSET = 10;
const paginationExample = {
  offset: PAGE_OFFSET,
  page: 1,
} as IPaginationData;

export const Edit = () => {
  const { deleteId, setModalData, setDeleteId, closeDeleteModal } =
    useModalAssetsContext();
  const {
    data,
    search,
    total,
    offset,
    isLoading,
    deleteProduct,
    setPage,
    setSearch,
  } = useProducts(paginationExample);

  const columns: TableColumnsType<IProduct> = [
    {
      title: "Фотография",
      dataIndex: "photo",
      width: 150,
      render: (photo) => {
        return (
          photo && <Image src={photo.url} style={{ width: 50, height: 50 }} />
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
      width: 400,
      dataIndex: "description",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.description.localeCompare(b.description),
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
          <Typography>{calcDiscount(price, discount)}</Typography>
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
              setDeleteId(values.key);
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value as string);
          }}
        />
      </div>

      <Table
        pagination={false}
        footer={() => (
          <Flex justify="end">
            <Pagination
              pageSize={offset}
              total={total}
              onChange={(pageNum) => setPage(pageNum)}
            />
          </Flex>
        )}
        dataSource={data}
        onRow={(data) => {
          return {
            onClick: () => {
              setModalData(transformDataToForm(data));
            },
          };
        }}
        columns={columns}
        loading={isLoading}
      />
      <Modal
        open={!!deleteId}
        onOk={() => deleteProduct(deleteId).then(closeDeleteModal)}
        onCancel={closeDeleteModal}
        title="Вы уверены что хотите удалить?"
      />
    </div>
  );
};
