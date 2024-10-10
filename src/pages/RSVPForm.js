// src/RSVPForm.js
import React, { useState, useEffect } from "react";
import ActionResult from "../components/ActionResult";
import { useLocation } from "react-router-dom";
import { convertOption } from "../models/res/GetRSVPResponse.ts";
import convertToLocalDateTime from "../util/DateTImeConverter.ts";
import {
  Layout,
  theme,
  Form,
  Button,
  Card,
  Divider,
  Radio,
  Space,
  Input,
} from "antd";
import { useParams } from "react-router-dom";
import { getActiveRSVPApi, sendRSVPApi } from "../services/RsvpAdapter.ts";

const { Content } = Layout;

const RSVPForm = () => {
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

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get unique ID from the URL
  // const [name, setName] = useState("");
  // const [willAttend, setWillAttend] = useState("yes");
  const [submitted, setSubmitted] = useState(0);
  const [errorMsg, setErrorMsg] = useState(
    "다시 시도해주세요. 계속 실패 시 앱스토어로 연락부탁드립니다."
  );
  var [rsvpForm, setRsvpForm] = useState({});
  const [form] = Form.useForm();

  const pathname = location.pathname;

  useEffect(() => {
    getActiveRSVPApi(pathname).then((res) => {
      setRsvpForm(res);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = () => {
    setLoading(pathname);
    try {
      sendRSVPApi(pathname, form).then((res) => {
        if (res === "success") {
          setSubmitted(1);
        }
      });
    } catch (error) {
      setSubmitted(2);
      setErrorMsg(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted === 1) {
    return (
      <ActionResult
        result="success"
        title="주최자에게 성공적으로 회신하였습니다."
        directToMe="false"
      />
    );
  } else if (submitted === 2) {
    return (
      <ActionResult
        result="error"
        title="주최자에게 회신 전송에 실패하였습니다."
        message={errorMsg}
        directToMe="false"
      />
    );
  }

  if (loading) {
    return <div>Loading...</div>;
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
        <Card
          title={rsvpForm.name}
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <div>
            <p>
              <b>시작 일시</b>
            </p>
            <p>{convertToLocalDateTime(rsvpForm.startOn)}</p>
          </div>
          <div>
            <p>
              <b>종료 일시</b>
            </p>
            <p>{convertToLocalDateTime(rsvpForm.endOn)}</p>
          </div>
          <div>
            <p>
              <b>모임 장소</b>
            </p>
            <p>{rsvpForm.location}</p>
          </div>
          {rsvpForm.description && (
            <div>
              <p>
                <b>모임 내용</b>
              </p>
              <p>{rsvpForm.description}</p>
            </div>
          )}
          {rsvpForm.timeLimit && (
            <div>
              <p>
                <b>회신 기한</b>
              </p>
              <p>{convertToLocalDateTime(rsvpForm.timeLimit)}</p>
            </div>
          )}
          <Divider>RSVP</Divider>
          <Form
            form={form}
            {...formItemLayout}
            variant="filled"
            onFinish={handleSubmit}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="rsvp"
              rules={[
                {
                  required: true,
                  message: "회신을 선택해주세요",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {rsvpForm.options.map((el) => (
                    <Radio value={el}>{convertOption(el)}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="이름"
              name="name"
              rules={[{ required: true, message: "이름을 입력해주세요" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="회신" name="message">
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
        </Card>
      </div>
    </Content>
  );
};

export default RSVPForm;
