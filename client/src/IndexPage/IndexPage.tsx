import React, { useEffect } from "react";
import { Layout, Menu, theme, Typography } from "antd";
import {
  FormOutlined,
  OrderedListOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useNavigate, useMatch, Outlet, useParams } from "react-router";

import styles from "./IndexPage.module.css";
import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

export const IndexPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const isIndex = useMatch("/")?.pathname === "/";

  useEffect(() => {
    if (isIndex) {
      navigate("/catalog");
    }
  }, []);

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.verticalLogo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: 1,
              icon: React.createElement(ReadOutlined),
              label: "Просмотр каталога",
              onClick: () => navigate("/catalog"),
            },
            {
              key: 2,
              icon: React.createElement(OrderedListOutlined),
              label: "Редактировать каталога",
              onClick: () => navigate("/edit"),
            },
            {
              key: 3,
              icon: React.createElement(FormOutlined),
              label: "Добавить товар",
              type: "item",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, paddingLeft: 24, background: colorBgContainer }}
        >
          <Typography.Text strong>
            Просмотр добавленных продуктов
          </Typography.Text>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
  // return (
  //   <Row gutter={18} className={styles.table}>
  //     <Col span={6}>
  //       <NavLink to="/edit/lists" end>
  //         <Card
  //           title={
  //             <Flex align="center" gap="small">
  //               <Typography>Добавить товар</Typography>
  //               <FormOutlined />
  //             </Flex>
  //           }
  //           hoverable
  //           variant="outlined"
  //         >
  //           Таблица с добавлением продукта
  //         </Card>
  //       </NavLink>
  //     </Col>
  //     <Col span={6}>
  //       <NavLink to="/products" end>
  //         <Card
  //           title={
  //             <Flex align="center" gap="small">
  //               <Typography>Просмотр</Typography>
  //               <OrderedListOutlined />
  //             </Flex>
  //           }
  //           hoverable
  //           variant="outlined"
  //         >
  //           Просмотр добавленных карточек
  //         </Card>
  //       </NavLink>
  //     </Col>
  //   </Row>
  // );
};
