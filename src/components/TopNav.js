import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles by default
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

const TopNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [activeKey, setActiveKey] = useState("");
  const [loading, setLoading] = useState(true);

  const onClick = (key) => {
    setActiveKey(key);
  };

  const pathToKeyChange = () => {
    onClick(pathname.substring(1));
  };

  useEffect(() => {
    pathToKeyChange();
    setLoading(false);
  }, [location.state, activeKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          activeKey={activeKey}
          onClick={onClick}
        >
          <Menu.Item key="" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="me" icon={<UserOutlined />}>
            <Link to="/me">Me</Link>
          </Menu.Item>
          <Menu.Item key="contact" icon={<MailOutlined />}>
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default TopNav;
