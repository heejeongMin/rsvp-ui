import React, { useState } from "react";
import { Layout, Form, Input, Button, Modal, Select, DatePicker } from "antd";
import ActionResult from "../components/ActionResult";

const { Content } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [result, setResult] = useState(false);

  const options = [
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
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleOk = () => {
    //call backend
    closeModal();
    setResult(true);
  };

  const handleCancel = () => {
    closeModal();
  };

  if (result) {
    return (
      <ActionResult
        result="success"
        title="RSVP 보내기 성공"
        message={"RSVP 링크 : http://localhost:3000/rsvp/123"}
      />
    );
  }

  return (
    <Content style={{ padding: "48px 48px" }}>
      <Button type="primary" onClick={showModal}>
        새로운 RSVP 만들기
      </Button>
      <Modal
        title="새로운 RSVP 만들기"
        open={isModalVisible}
        onOk={() => handleOk()}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOk}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="제목"
            name="name"
            rules={[{ required: true, message: "제목을 입력해주세요" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="생성자 이메일 (해당 이메일로 회신을 받게됩니다.)"
            name="email"
            rules={[{ required: true, message: "생성자 이메일을 입력하세요" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="모임 시작 일시"
            name="startDateAndTime"
            rules={[{ required: true, message: "모임 시작 시간을 입력하세요" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="모임 종료 일시"
            name="endDateAndTime"
            rules={[{ required: true, message: "모임 종료 시간을 입력하세요" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="모임 장소"
            name="location"
            rules={[{ required: true, message: "모임 장소를 입력하세요" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="회신 옵션 (다중 선택, 직접 입력 가능)"
            name="rsvp"
            rules={[{ required: true, message: "회신 옵션을 선택하세요" }]}
          >
            <Select mode="tags" style={{ width: "100%" }} options={options} />
          </Form.Item>
          <Form.Item label="회신 기한" name="rsvpDeadline">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="모임 내용" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default Home;
