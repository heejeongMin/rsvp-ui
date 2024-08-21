import React, { useEffect, useState } from "react";
import { Space, Card, Divider, Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const Me = () => {
  const [loading, setLoading] = useState(true);
  const [currentRSVP, setCurrentRSVP] = useState();
  const [totalNumber, setTotalNumber] = useState(0);

  const getCurrentRSVP = () => {
    const res = {
      name: "test-rsvp-name",
      startDateAndTime: "2024-08-18 09:00",
      endDateAndTime: "2024-08-18 18:00",
      location: "online",
      options: ["참가", "불참", "미정"],
      // deadline: "2024-08-17 17:00",
      response: [
        {
          option: "참가",
          number: 4,
          names: ["홍길동", "아무개", "이순신", "강감찬"],
        },
        { option: "불참", number: 1, names: ["김개똥"] },
        { option: "미정", number: 0, names: [] },
      ],
    };

    let num = 0;

    res.response.map((el) => {
      num = num + el.number;
    });

    setCurrentRSVP(res);
    setTotalNumber(num);
  };

  useEffect(() => {
    getCurrentRSVP();
    setLoading(false);
  }, []);

  const showModal = () => {
    confirm({
      title: "아직 RSVP가 진행중입니다.",
      icon: <ExclamationCircleFilled />,
      content: "정말 종료하시겠습니까?",
      okText: "확인",
      okType: "danger",
      okButtonProps: {
        disabled: false,
      },
      cancelText: "취소",
      onOk() {
        closeRSVP();
      },
      onCancel() {},
    });
  };

  const closeRSVP = () => {
    setCurrentRSVP();
    setTotalNumber(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
        padding: "48px 48px",
      }}
    >
      <Card title="RSVP" extra={<a href="#">지난 RSVP 보기</a>}>
        {!currentRSVP && <p>현재 진행중인 RSVP가 없습니다</p>}
        {currentRSVP && (
          <Card
            type="inner"
            title={currentRSVP.name}
            extra={<Button onClick={showModal}>RSVP 종료하기</Button>}
          >
            <div>
              <p>총 회신 수 : {totalNumber}</p>
            </div>
            {currentRSVP.response.map((el) => (
              <p>
                {el.option}({el.number})
                {el.names.length > 0 && (
                  <ul style={{ marginLeft: "20px" }}>
                    {el.names.map((name) => (
                      <li>{name}</li>
                    ))}
                  </ul>
                )}
              </p>
            ))}
            <Divider>RSVP 내역</Divider>
            <div>
              <p>
                <b>시작 일시</b>
              </p>
              <p>{currentRSVP.startDateAndTime}</p>
            </div>
            <div>
              <p>
                <b>종료 일시</b>
              </p>
              <p>{currentRSVP.endDateAndTime}</p>
            </div>
            <div>
              <p>
                <b>모임 장소</b>
              </p>
              <p>{currentRSVP.location}</p>
            </div>
            <div>
              <p>
                <b>회신 옵션</b>
              </p>
              {currentRSVP.options.map((el) => (
                <span>{el} </span>
              ))}
            </div>
            {currentRSVP.description && (
              <div>
                <p>
                  <b>모임 내용</b>
                </p>
                <p>{currentRSVP.description}</p>
              </div>
            )}
            {currentRSVP.deadline && (
              <div>
                <p>
                  <b>회신 기한</b>
                </p>
                <p>{currentRSVP.deadline}</p>
              </div>
            )}
          </Card>
        )}
      </Card>
    </Space>
  );
};

export default Me;
