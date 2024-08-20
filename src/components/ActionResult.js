import React, { useState, useEffect } from "react";

import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ActionResult = (props) => {
  const navigate = useNavigate();
  const { result, title, message } = props;

  const [loading, setLoading] = useState(true);
  const [subtitle, setSubtitle] = useState("");

  const redirect = () => {
    navigate("/me", { state: { refresh: true } });
  };

  useEffect(() => {
    setSubtitle(message);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Result
      status="success"
      title={title}
      subTitle={subtitle}
      extra={[
        <Button type="primary" onClick={redirect} key="1">
          마이페이지 이동
        </Button>,
      ]}
    />
  );
};

export default ActionResult;
