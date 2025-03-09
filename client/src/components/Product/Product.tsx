import { Divider, Flex, Image, Typography } from "antd";
import { useParams } from "react-router";

import { calcDiscount } from "../../utils/calcDiscount";
import { productsApi } from "../../api/productService";
import styles from "./Product.module.css";

export const Product = () => {
  const params = useParams();
  const { data } = productsApi.useGetProductQuery(params.id || "");
  const price = data?.price || 0;
  const discount = data?.discount || 0;

  return (
    <Flex className={styles.root}>
      <Flex align="start" gap="2">
        <div className={styles.imageWrapper}>
          <Image
            width={300}
            height={300}
            src={data?.photo?.url}
            placeholder={!data?.photo}
          />
        </div>
        <div>
          <Typography.Title className={styles.title}>
            {data?.title}
          </Typography.Title>

          <Typography.Paragraph>{data?.description}</Typography.Paragraph>

          <div>
            <Divider />
            <Flex align="end">
              <Typography.Paragraph className={styles.priceText}>
                {data?.price} $
              </Typography.Paragraph>
              <Flex vertical>
                <Typography.Paragraph className={styles.priceLabel}>
                  Цена по скидке
                </Typography.Paragraph>

                <Typography.Paragraph className={styles.discountPriceText}>
                  {calcDiscount(price, discount)} $
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};
