import React from "react";
import { message, Flex, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/Auth";

const Login = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = () => {
    messageApi.error("로그인에 실패하였습니다. 다시 시도하여주세요");
  };

  useEffect(() => {
    getToken(code).then((result) => {
      if (result === "success") {
        navigate("/");
      } else {
        errorMessage();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  return (
    <Flex
      align="center"
      gap="middle"
      style={{
        width: 380,
        maxWidth: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%",
      }}
    >
      {contextHolder}
      <Spin size="large" />
    </Flex>
    // </Card>
  );
};

export default Login;
