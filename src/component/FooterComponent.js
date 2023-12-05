import axios from "axios";
import React, { useState, useEffect } from "react";
import API_KEY from "../NeedIgnore.js";
import "../style/FooterComponent.css";

const FooterComponent = () => {
  useEffect(() => {
    getChallenge();
  }, []);

  const [guardian, setGuardian] = useState([]);
  const [abyss, setAbyss] = useState([]);

  const getChallenge = async () => {
    try {
      const responseGuardian = axios.get(
        "https://developer-lostark.game.onstove.com/gamecontents/challenge-guardian-raids",
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      const responseAbyss = axios.get(
        "https://developer-lostark.game.onstove.com/gamecontents/challenge-abyss-dungeons",
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      const [data1Guardian, data2Abyss] = await Promise.all([
        responseGuardian,
        responseAbyss,
      ]);

      setGuardian(data1Guardian.data.Raids);
      setAbyss(data2Abyss.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <footer className="FooterComponent">
      <div className="GuardianTitle">
        <h2>도전 가디언 토벌</h2>
      </div>
      <div className="GuardianList">
        {/* {guardian.map((raid, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <img src={raid.Image} alt="#"></img>
            {raid.Name}
          </li>
        ))} */}
        <ul>
          {guardian.map((raid, index) => (
            <li key={index} style={{ listStyle: "none", position: "relative" }}>
              <img
                src={raid.Image}
                alt="#"
                style={{ width: "250px", height: "100px" }}
              />
              <span style={{ position: "absolute", top: "0", left: "0" }}>
                {raid.Name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="AbyssTitle">
        <h2>도전 어비스 던전</h2>
      </div>
      <div className="AbyssList">
        <ul>
          {abyss.map((aby, index) => (
            <li key={index} style={{ listStyle: "none", position: "relative" }}>
              <img
                src={aby.Image}
                alt="#"
                style={{ width: "250px", height: "100px" }}
              ></img>
              <span style={{ position: "absolute", top: "0", left: "0" }}>
                {aby.Name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default FooterComponent;
