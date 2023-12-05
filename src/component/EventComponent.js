import axios from "axios";
import React, { useState, useEffect } from "react";
import API_KEY from "../NeedIgnore";
import "../style/EventComponent.css";

const EventComponent = () => {
  useEffect(() => {
    getEvents();
  }, []);

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      // api 서버에 요청 보내기
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/news/events`,
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      const eventList = response.data.slice(0, 3);
      setEvents(eventList);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="EventComponent">
      {events.map((e, index) => (
        <li key={index} style={{ listStyle: "none" }} className="event">
          <a href={e.Link}>
            <img src={e.Thumbnail} alt="썸네일" />
          </a>
        </li>
      ))}
    </div>
  );
};

export default EventComponent;
