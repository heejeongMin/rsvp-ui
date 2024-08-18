import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles by default
import { Link } from "react-router-dom";

const { Header } = Layout;

const TopNav = () => {
  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/me">Me</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MailOutlined />}>
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default TopNav;
