import React from "react";
import { Form, Input, Modal, Typography, Upload, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as yup from "yup";

import { useImageUpload } from "../../hooks/useImageUpload";

import styles from "./AddProduct.module.css";
import { initialProductValues } from "../../constants/initialValues";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useEditProduct } from "../../hooks/useEditProduct";

import { IProductForm } from "../../interface/IProduct";

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
    price: yup.string().required(),
    discount: yup.string().required(),
    photo: yup.object({
      url: yup.string(),
      filename: yup.string(),
      type: yup.string(),
    }),
  })
  .required();

export const AddProduct: React.FC<IAddProductModalProps> = ({
  modalData = initialProductValues,
  isModalOpened,
  onCancel,
}) => {
  const isEditMode = modalData !== initialProductValues;
  const { createProduct, isCreating } = useCreateProduct();
  const { editProduct, isEditing } = useEditProduct();
  const { photo, uploadImage, resetImage } = useImageUpload(modalData.photo);

  const fileList: UploadFile[] = photo
    ? [
        {
          uid: photo?.id || "",
          name: photo?.filename || "",
          url: photo?.url || "",
          type: photo?.type || "",
        },
      ]
    : [];

  return (
    <Formik
      initialValues={modalData}
      validationSchema={schema}
      enableReinitialize
      onSubmit={(values) => {
        if (isEditMode) {
          editProduct(values).then(onCancel);
          return;
        }
        createProduct({ ...values, photo }).then(onCancel);
      }}
    >
      {({ errors, values, handleChange }) => {
        return (
          <Modal
            open={isModalOpened}
            onCancel={onCancel}
            onOk={() => createProduct({ ...values, photo }).then(onCancel)}
          >
            <Form<IProductForm>
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 720 }}
              disabled={isCreating || isEditing}
            >
              <Form.Item
                label={
                  <Typography className={styles.formItem}>Баннер</Typography>
                }
                valuePropName="fileList"
              >
                <div>
                  <Upload
                    customRequest={uploadImage}
                    listType="picture-card"
                    fileList={fileList}
                    multiple={false}
                    onRemove={resetImage}
                  >
                    {!fileList.length && (
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
                    )}
                  </Upload>
                </div>
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
                    type="number"
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
                    type="number"
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
