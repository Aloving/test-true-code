import React from "react";
import { Form, Input, Modal, Typography, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as yup from "yup";

import styles from "./AddProduct.module.css";
import { productService } from "../api/productService";
import { useCreateProduct } from "../hooks/useCreateProduct";

import { IProductForm } from "../interface/IProduct";

interface IAddProductModalProps {
  isModalOpened: boolean;
  modalData?: IProductForm;

  onCancel: () => void;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
    article: yup.string().required(),
    // banner: yup.mixed().required(),
    price: yup.string().required(),
    discount: yup.string().required(),
  })
  .required();

const initialValues = {
  title: "",
  description: "",
  article: "",
  price: "",
  discount: "",
};

export const AddProduct: React.FC<IAddProductModalProps> = ({
  modalData = initialValues,
  isModalOpened,
  onCancel,
}) => {
  // const {} = useCreateProduct();
  const requestToIdle = () => {
    // productService.getProducts()
    // fetch("/api/brands").then(console.log).catch(console.error);
  };

  return (
    <Formik
      initialValues={modalData}
      validationSchema={schema}
      enableReinitialize
      onSubmit={(values) => {
        // requestToIdle();
      }}
    >
      {({ errors, values, handleChange }) => {
        return (
          <Modal
            open={isModalOpened}
            onCancel={onCancel}
            onOk={() => {
              console.log("asdasdas");
              requestToIdle();
            }}
          >
            <Form<IProductForm>
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 720 }}
              // disabled={isLoading}
            >
              <Form.Item
                label={
                  <Typography className={styles.formItem}>Баннер</Typography>
                }
                valuePropName="fileList"
              >
                <Upload
                  action="/api/files/images"
                  listType="picture-card"
                  onChange={(image) => {
                    console.log("image", image.file.response);
                    // setValue("banner", banner.file);
                    // setValue("banner", banner)
                  }}
                >
                  <button
                    style={{
                      color: "inherit",
                      cursor: "inherit",
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Баннер</div>
                  </button>
                </Upload>
              </Form.Item>

              <Form.Item label="Название">
                <Input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  status={errors.title ? "error" : ""}
                />
              </Form.Item>
              <Form.Item label="Описание">
                <div className={styles.formItem}>
                  <Input.TextArea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    cols={4}
                    status={errors.description ? "error" : ""}
                  />
                </div>
              </Form.Item>
              <Form.Item label="Стоимость">
                <div className={styles.formItem}>
                  <Input
                    name="price"
                    value={values.price || ""}
                    onChange={handleChange}
                    status={errors.price ? "error" : ""}
                  />
                </div>
              </Form.Item>

              <Form.Item label="Скидка">
                <div className={styles.formItem}>
                  <Input
                    name="discount"
                    value={values.discount || ""}
                    onChange={handleChange}
                    status={errors.discount ? "error" : ""}
                  />
                </div>
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};
