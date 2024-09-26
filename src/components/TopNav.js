import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Popover, message } from "antd";
import { HomeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles by default
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { login, logout } from "../services/Auth";
import kakaoLogin from "../resources/kakao_login_small.png";
import { isUserLoggedIn } from "../redux/StoreHelper.ts";

const { Header } = Layout;

const TopNav = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [loginTxt, setLoginTxt] = useState("login");

  const onClick = (key) => {
    setActiveKey(key);
  };

  const pathToKeyChange = () => {
    onClick(pathname.substring(1));
  };

  const handle = () => {
    if (loginTxt === "login") {
      login();
    } else {
      logout().then((res) => {
        if (res === "success") {
          setLoginTxt("login");
          messageApi.info("성공적으로 로그아웃 하였습니다.");
        } else {
          messageApi.error("로그아웃에 실패하였습니다. 다시 시도하여주세요");
        }
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  };

  useEffect(() => {
    pathToKeyChange();

    if (isUserLoggedIn()) {
      setLoginTxt("logout");
    } else {
      setLoginTxt("login");
    }
    setLoading(false);
  }, [location.state, activeKey, loginTxt]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {contextHolder}
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
          <Menu.Item key="loginLogout" style={{ marginLeft: "auto" }}>
            {loginTxt === "login" && (
              <Popover
                content={
                  <a>
                    <img src={kakaoLogin} onClick={handle} />
                  </a>
                }
              >
                <Button>{loginTxt}</Button>
              </Popover>
            )}
            {loginTxt === "logout" && (
              <Button onClick={handle}>{loginTxt}</Button>
            )}
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default TopNav;
