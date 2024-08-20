// src/RSVPForm.js
import React, { useState, useEffect } from "react";
import { Layout, theme, Form, Button, Card, Divider, Radio, Space } from "antd";
import { useParams } from "react-router-dom";

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

  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get unique ID from the URL
  // const [name, setName] = useState("");
  // const [willAttend, setWillAttend] = useState("yes");
  const [submitted, setSubmitted] = useState(false);
  var [rsvpForm, setRsvpForm] = useState({});

  useEffect(() => {
    // Fetch form data based on ID if needed
    // e.g., fetch(`/api/getFormData/${id}`).then(...)
    const fetchRSVPFrom = async () => {
      setRsvpForm({
        name: "test-rsvp-name",
        startDateAndTime: "2024-08-18 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: [
          {
            label: "참가",
            value: "Y",
          },
          {
            label: "불참",
            value: "N",
          },
          {
            label: "미정",
            value: "YN",
          },
        ],
        deadline: "2024-08-17 17:00",
        // description: "testset",
      });
      setLoading(false);
    };
    fetchRSVPFrom();
  }, [id]);

  const handleSubmit = () => {
    setSubmitted(true);

    // Simulate sending data to a server
    // fetch("/api/rsvp", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id, name, willAttend }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     setSubmitted(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  if (submitted) {
    return <p>Thank you for your RSVP!</p>;
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
            <p>시작 일시</p>
            <p>{rsvpForm.startDateAndTime}</p>
          </div>
          <div>
            <p>종료 일시</p>
            <p>{rsvpForm.endDateAndTime}</p>
          </div>
          <div>
            <p>모임 장소</p>
            <p>{rsvpForm.location}</p>
          </div>
          {rsvpForm.description && (
            <div>
              <p>모임 내용</p>
              <p>{rsvpForm.description}</p>
            </div>
          )}
          {rsvpForm.deadline && (
            <div>
              <p>회신 기한</p>
              <p>{rsvpForm.deadline}</p>
            </div>
          )}
          <Divider>RSVP</Divider>
          <Form
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
              {/* <Select style={{ width: "100%" }} options={rsvpForm.options} /> */}
              <Radio.Group>
                <Space direction="vertical">
                  {rsvpForm.options.map((el) => (
                    <Radio value={el.value}>{el.label}</Radio>
                  ))}
                </Space>
              </Radio.Group>
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
