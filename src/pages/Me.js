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
  Result,
} from "antd";
import InfiniteScroll from "https://esm.sh/react-infinite-scroll-component";
import {
  ExclamationCircleFilled,
  MailOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  getActiveRSVPApi,
  closeRSVPApi,
  getHistoryRSVPApi,
} from "../services/RsvpAdapter.ts";
import { convertOption } from "../models/res/GetRSVPResponse.ts";
import { isUserLoggedIn } from "../redux/StoreHelper.ts";
import convertToLocalDateTime from "../util/DateTImeConverter.ts";

const { confirm } = Modal;

const Me = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [currentRSVP, setCurrentRSVP] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [displayDetailList, setDisplayDetailList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCurrentRSVP = async () => {
    getActiveRSVPApi().then((res) => {
      setCurrentRSVP(res.rsvp);
    });
  };

  const getHistoryRSVP = () => {
    if (!historyLoading) {
      return;
    }

    getHistoryRSVPApi(historyPage).then((res) => {
      setHistory([...history, ...res.responses]);
      setHistoryTotal(res.pageInfo.totalElements);
      setHistoryTotal(res.pageInfo.totalElements);
      if (!res.pageInfo.isLast) {
        setHistoryPage(historyPage + 1);
      }

      setHistoryLoading(!res.pageInfo.isLast);
    });
  };

  const showModal = (link) => {
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
        closeRSVPApi(link).then((res) => {
          if (res === "success") {
            window.location.reload();
          }
        });
      },
      onCancel() {},
    });
  };

  const toggleCurrentAndHistory = () => {
    setShowHistory(!showHistory);
  };

  const collapseHistoryDetail = (e) => {
    const val = e.target.innerText;

    setDisplayDetailList([...displayDetailList, val]);

    const isExist = displayDetailList.find((element) => {
      return element === val;
    });

    if (isExist) {
      const newList = displayDetailList.filter((item) => item !== val);
      setDisplayDetailList(newList);
    } else {
      setDisplayDetailList([...displayDetailList, val]);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
      getCurrentRSVP();
      getHistoryRSVP();
    } else {
      setIsLoggedIn(false);
    }

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
      {!isLoggedIn && (
        <Result
          icon={<LoginOutlined />}
          title="빠른 로그인으로 RSVP를 관리해보세요!"
        />
      )}
      {isLoggedIn && (
        <Card
          title="RSVP"
          extra={
            <a onClick={toggleCurrentAndHistory}>
              {!showHistory && "지난 RSVP 보기"}
              {showHistory && "현재 RSVP 보기"}
            </a>
          }
        >
          {currentRSVP.length === 0 && <p>현재 진행중인 RSVP가 없습니다</p>}
          {currentRSVP &&
            !showHistory &&
            currentRSVP.map((rsvp) => (
              <Card
                type="inner"
                title={rsvp.name}
                extra={
                  <Button onClick={() => showModal(rsvp.link)}>
                    RSVP 종료하기
                  </Button>
                }
                style={{ marginBottom: 20 }}
                headStyle={{ backgroundColor: "#d9e7fc" }}
                bodyStyle={{ backgroundColor: "#f5f9ff" }}
              >
                {rsvp.responders.length === 0 && (
                  <div>
                    <p>받은 회신이 없습니다.</p>
                  </div>
                )}
                {rsvp.responders.length > 0 && (
                  <div>
                    <p>총 회신 수 : {rsvp.responders.length}</p>
                  </div>
                )}

                {rsvp.responders.length > 0 &&
                  rsvp.responders.map((el) => (
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
                  <p>{rsvp.link}</p>
                </div>
                <div>
                  <p>
                    <b>시작 일시</b>
                  </p>
                  <p>{convertToLocalDateTime(rsvp.startOn)}</p>
                </div>
                <div>
                  <p>
                    <b>종료 일시</b>
                  </p>
                  <p>{convertToLocalDateTime(rsvp.endOn)}</p>
                </div>
                <div>
                  <p>
                    <b>모임 장소</b>
                  </p>
                  <p>{rsvp.location}</p>
                </div>
                <div>
                  <p>
                    <b>회신 옵션</b>
                  </p>
                  <p>
                    {rsvp.options.map((el) => (
                      <span>{convertOption(el)} </span>
                    ))}
                  </p>
                </div>
                {rsvp.description && (
                  <div>
                    <p>
                      <b>모임 내용</b>
                    </p>
                    <p>{rsvp.description}</p>
                  </div>
                )}
                {rsvp.timeLimit && (
                  <div>
                    <p>
                      <b>회신 기한</b>
                    </p>
                    <p>{convertToLocalDateTime(rsvp.timeLimit)}</p>
                  </div>
                )}
              </Card>
            ))}
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
                hasMore={history.length < historyTotal}
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
                      <List.Item
                        key={item.name}
                        onClick={collapseHistoryDetail}
                      >
                        <List.Item.Meta
                          title={<p>{item.name}</p>}
                          description={item.description}
                        />
                        <div>
                          {item.location} / {item.startOn} ~ {item.endOn}
                        </div>
                      </List.Item>
                      {/* {displayDetailList.length > 0 &&
                        displayDetailList.find((el) => {
                          return el === item.name;
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
                        )} */}
                    </>
                  )}
                />
              </InfiniteScroll>
            </div>
          )}
        </Card>
      )}
    </Space>
  );
};

export default Me;
