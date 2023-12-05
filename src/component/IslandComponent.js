import axios from "axios";
import React, { useState, useEffect } from "react";
import API_KEY from "../NeedIgnore";
import "../style/IslandComponent.css";
import "../style/font.css";

const RewardItem = ({ icon }) => <img src={icon} alt="#" />;

const IslandComponent = () => {
  useEffect(() => {
    getIsland();
  }, []);

  const [island, setIsland] = useState([]);

  const getIsland = async () => {
    try {
      // api 서버에 요청 보내기
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/gamecontents/calendar`,
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      // 현재 날짜 가져오기 (시간은 0으로 설정)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // response.data에서 필터링
      const filteredArray = response.data.filter(function (item) {
        // StartTimes가 null이 아니면서 오늘의 날짜와 같은 값을 가지는지 확인
        if (item.StartTimes && Array.isArray(item.StartTimes)) {
          return (
            item.CategoryName === "모험 섬" &&
            item.StartTimes.some((startTime) => {
              const startTimeDate = new Date(startTime);
              startTimeDate.setHours(0, 0, 0, 0);
              return startTimeDate.getTime() === today.getTime();
            })
          );
        }
        return false;
      });

      setIsland(filteredArray);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="IslandComponent">
      <h2>오늘의 모험섬</h2>
      <div className="IslandList">
        {island.map((i, index) => (
          <div key={index} className="island">
            <img src={i.ContentsIcon} alt="#"></img>
            <div className="island_column">
              <h4>{i.ContentsName}</h4>
              <div className="island_raw">
                {i.RewardItems.map((reward, rewardIndex) => (
                  <RewardItem key={rewardIndex} icon={reward.Icon} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslandComponent;
