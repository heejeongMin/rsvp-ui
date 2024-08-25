import React, { useEffect, useState } from "react";
import {
  Space,
  Card,
  Divider,
  Button,
  Modal,
  Popover,
  Skeleton,
  List,
} from "antd";
import InfiniteScroll from "https://esm.sh/react-infinite-scroll-component";
import { ExclamationCircleFilled, MailOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Me = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [currentRSVP, setCurrentRSVP] = useState();
  const [totalNumber, setTotalNumber] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState();
  const [int, setInt] = useState(0); //test property
  const [displayDetailList, setDisplayDetailList] = useState([]);

  const getCurrentRSVP = () => {
    const res = {
      name: "test-rsvp-name",
      startDateAndTime: "2024-08-18 09:00",
      endDateAndTime: "2024-08-18 18:00",
      location: "online",
      options: ["참가", "불참", "미정"],
      deadline: "2024-08-17 17:00",
      description: "testsetsetsetse",
      response: [
        {
          option: "참가",
          number: 4,
          names: [
            { name: "홍길동" },
            { name: "아무개" },
            { name: "이순신", reply: "나를 따르라" },
            { name: "강감찬" },
          ],
        },
        {
          option: "불참",
          number: 1,
          names: [{ name: "김개똥", reply: "미안" }],
        },
        { option: "미정", number: 0, names: [] },
      ],
      link: "http://localhost:3000/rsvp/123",
    };

    let num = 0;

    res.response.map((el) => {
      num = num + el.number;
    });

    setCurrentRSVP(res);
    setTotalNumber(num);
  };

  const getHistoryRSVP = () => {
    if (historyLoading) {
      return;
    }

    setHistoryLoading(true);

    //callbackend
    const res = [
      {
        name: "test-rsvp-name2",
        startDateAndTime: "2024-08-18 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
      {
        name: "test-rsvp-name3",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
      {
        name: "test-rsvp-name4",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
      {
        name: "test-rsvp-name5",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
      {
        name: "test-rsvp-name6",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
    ];

    var res2 = [
      {
        name: "test-rsvp-name7",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
      {
        name: "test-rsvp-name8",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
      {
        name: "test-rsvp-name9",
        startDateAndTime: "2024-08-17 09:00",
        endDateAndTime: "2024-08-18 18:00",
        location: "online",
        options: ["참가", "불참", "미정"],
        deadline: "2024-08-17 17:00",
        description: "testsetsetsetse",
        response: [
          {
            option: "참가",
            number: 4,
            names: [
              { name: "홍길동" },
              { name: "아무개" },
              { name: "이순신", reply: "나를 따르라" },
              { name: "강감찬" },
            ],
          },
          {
            option: "불참",
            number: 1,
            names: [{ name: "김개똥", reply: "미안" }],
          },
          { option: "미정", number: 0, names: [] },
        ],
        link: "http://localhost:3000/rsvp/123",
      },
    ];

    if (int == 0) {
      setHistory(res);
      setInt(1);
    } else {
      setHistory([...history, ...res2]);
    }

    setHistoryLoading(false);
  };

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

  const toggleCurrentAndHistory = () => {
    setShowHistory(!showHistory);
  };

  const collapseHistoryDetail = (e) => {
    const val = e.target.innerText;

    setDisplayDetailList([...displayDetailList, val]);

    const isExist = displayDetailList.find((element) => {
      return element == val;
    });

    if (isExist) {
      const newList = displayDetailList.filter((item) => item !== val);
      setDisplayDetailList(newList);
    } else {
      setDisplayDetailList([...displayDetailList, val]);
    }

    console.log(val, displayDetailList);
  };

  useEffect(() => {
    getCurrentRSVP();
    getHistoryRSVP();
    setPageLoading(false);
  }, []);

  if (pageLoading) {
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
      <Card
        title="RSVP"
        extra={
          <a onClick={toggleCurrentAndHistory}>
            {!showHistory && "지난 RSVP 보기"}
            {showHistory && "현재 RSVP 보기"}
          </a>
        }
      >
        {!currentRSVP && <p>현재 진행중인 RSVP가 없습니다</p>}
        {currentRSVP && !showHistory && (
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
                    {el.names.map((val) => (
                      <li>
                        {val.name}{" "}
                        {val.reply && (
                          <Popover
                            content={val.reply}
                            title="추신"
                            trigger="click"
                            placement="topLeft"
                          >
                            <MailOutlined />
                          </Popover>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </p>
            ))}
            <Divider>RSVP 내역</Divider>
            <div>
              <p>
                <b>RSVP 링크</b>
              </p>
              <p>{currentRSVP.link}</p>
            </div>
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
              <p>
                {currentRSVP.options.map((el) => (
                  <span>{el} </span>
                ))}
              </p>
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
        {showHistory && (
          <div
            id="scrollableDiv"
            style={{
              height: 400,
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={history.length}
              next={getHistoryRSVP}
              hasMore={history.length < 8}
              loader={
                <Skeleton
                  paragraph={{
                    rows: 2,
                  }}
                  active
                />
              }
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={history}
                renderItem={(item) => (
                  <>
                    <List.Item key={item.name} onClick={collapseHistoryDetail}>
                      <List.Item.Meta
                        title={<p>{item.name}</p>}
                        description={item.description}
                      />
                      <div>
                        {item.location} / {item.startDateAndTime} ~{" "}
                        {item.endDateAndTime}
                      </div>
                    </List.Item>
                    {displayDetailList.length > 0 &&
                      displayDetailList.find((el) => {
                        return el == item.name;
                      }) && (
                        <div key={item.name + "detail"} id={item.name}>
                          {item.response.map((el) => (
                            <p>
                              {el.option}({el.number})
                              {el.names.length > 0 && (
                                <ul style={{ marginLeft: "20px" }}>
                                  {el.names.map((val) => (
                                    <li>
                                      {val.name}{" "}
                                      {val.reply && (
                                        <Popover
                                          content={val.reply}
                                          title="추신"
                                          trigger="click"
                                          placement="topLeft"
                                        >
                                          <MailOutlined />
                                        </Popover>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </p>
                          ))}
                        </div>
                      )}
                  </>
                )}
              />
            </InfiniteScroll>
          </div>
        )}
      </Card>
    </Space>
  );
};

export default Me;
