import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Success = (props) => {
  const navigate = useNavigate();
  const { path } = props;

  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");

  const redirect = () => {
    navigate("/me", { state: { refresh: true } });
  };

  useEffect(() => {
    setLink("http://localhost:3000/rsvp/" + path);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Result
      status="success"
      title="RSVP 만들기 성공!"
      subTitle={"RSVP 링크 : " + link}
      extra={[
        <Button type="primary" onClick={redirect}>
          마이페이지 이동
        </Button>,
      ]}
    />
  );
};

export default Success;
