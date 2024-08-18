import React, { useEffect, useState } from "react";
import { Layout, theme, Form, Button, Input } from "antd";
import emailjs from "@emailjs/browser";

const { Content } = Layout;

const Contact = () => {
  useEffect(() => emailjs.init("cv09W9A2y5bpv1mbu"), []);

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

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    const serviceId = "service_qitsmed";
    const templateId = "template_1k43xxj";
    const toName = "pancho mom";
    const appName = "rsvp";

    try {
      setLoading(true);
      emailjs.send(serviceId, templateId, {
        to_name: toName,
        from_name: values.name,
        app_name: appName,
        reply_to: values.email,
        message: values.message,
      });

      alert("email successfully sent");
    } catch (error) {
      console.log(error);
      alert("email failed to send. please contact app admin.");
    } finally {
      setLoading(false);
    }
  };

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
