import React, { useEffect, useState } from "react";
import { Layout, theme, Form, Button, Input } from "antd";
import emailjs from "@emailjs/browser";
import ActionResult from "../components/ActionResult";

const { Content } = Layout;
const EMAIL_JS_KEY = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;
const EMAIL_JS_SERVICE_ID = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
const EMAIL_JS_TEMPLATE_ID = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID;
const EMAIL_JS_TO_NAME = process.env.REACT_APP_EMAIL_JS_TO_NAME;
const EMAIL_JS_APP_NAME = process.env.REACT_APP_EMAIL_JS_APP_NAME;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;

const Contact = () => {
  const [emailSent, setEmailSent] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  useEffect(() => {
    emailjs.init(`${EMAIL_JS_KEY}`);
  }, []);

  const handleSubmit = (values) => {
    try {
      setLoading(true);
      var result = 1;

      emailjs
        .send(`${EMAIL_JS_SERVICE_ID}`, `${EMAIL_JS_TEMPLATE_ID}`, {
          to_name: `${EMAIL_JS_TO_NAME}`,
          from_name: values.name,
          app_name: `${EMAIL_JS_APP_NAME}`,
          reply_to: values.email,
          message: values.message,
        })
        .catch((error) => {
          console.log(error);
          result = 2;
        })
        .finally(() => {
          setEmailSent(result);
        });
    } catch (error) {
      setEmailSent(2);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent === 1) {
    return (
      <ActionResult
        result="success"
        title="이메일을 전송하였습니다."
        message="작성하신 이메일로 회신을 하도록 하겠습니다."
      />
    );
  } else if (emailSent === 2) {
    return (
      <ActionResult
        result="error"
        title="이메일 전송에 실패하였습니다."
        message="다시 시도해주세요. 계속 실패 시 앱스토어로 연락부탁드립니다."
      />
    );
  }

  return (
    <Content style={{ padding: "48px 48px" }}>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        <Form
          {...formItemLayout}
          variant="filled"
          onFinish={handleSubmit}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="이름"
            name="name"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              {
                required: true,
                message: "이메일을 입력해 주세요",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="메세지"
            name="message"
            type="textarea"
            rules={[
              {
                required: true,
                message: "메세지를 입력해주세요",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              전송
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default Contact;
