import axios from "axios";
import React, { useState, useEffect } from "react";
import API_KEY from "../NeedIgnore";
import "../style/NoticeComponent.css";

const NoticeComponent = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = async () => {
    try {
      // api 서버에 요청 보내기
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/news/notices?type=%EA%B3%B5%EC%A7%80`,
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      // 응답 데이터를 상태에 저장
      const noticeList = response.data.slice(0, 5);
      setNotices(noticeList);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="Notice">
      <h2>로스트아크 공지사항</h2>
      <div className="NoticeList">
        {notices.map((notice, index) => (
          <li key={index}>
            <a href={notice.Link}>{notice.Title}</a>
          </li>
        ))}
      </div>
    </div>
  );
};

export default NoticeComponent;
