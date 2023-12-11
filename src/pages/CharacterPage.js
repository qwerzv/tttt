import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/CharacterPage.css";
import Chart from "chart.js/auto";
import HeaderComponent from "../component/HeaderComponent";
import FooterComponent from "../component/FooterComponent";

const API_KEY =
  "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjM3MzQifQ.cOxA0cajp7aTwULOwevlYQo83M33p4v6l2Q0HQDggo7PZ7LE0_njBcTWwN_8ss0aMdZ7GNmUbkV4c2c60WQECCZwKmd-c8kmUa108DYANuRVGQ81recNKUZYBLgMVbLWmUyWTWWpW5HuM4ekEk0YI1B6-OHhPEYgxOjteAGwOP2bSK2w2tuiby4KWZyCmWzvMpbVun36psuIWNXKvNkzwIz8uUEa8wOwV8Av5-iXWn_3OXhm6Qzly--DTZu4REftxL9sp4_7RwZ_7dX7NXleB-YlvV9BEqlX17w52LegDz_iRRUmd2BFwoVAOs76Y864xfh0NtruCT4yB9wfz5z2Qw";

const CharacterPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loaApiResponse, setLoaResponse] = useState(null); // 초기 값은 null로 설정

  const seasons = loaApiResponse ? loaApiResponse.ColosseumInfo.Colosseums : [];
  const mostRecentSeason =
    seasons.length > 0 ? seasons[seasons.length - 1] : null; // 애들한테 물어볼것.

  const renderTeamDeathmatchVictoryRateChart = () => {
    const canvas = document.getElementById("teamDeathmatchVictoryRateChart");
    const existingNoData = canvas.nextElementSibling;

    if (
      existingNoData &&
      existingNoData.classList.contains("no-data-message")
    ) {
      existingNoData.remove();
    }

    if (window.teamDeathmatchChart) {
      window.teamDeathmatchChart.destroy();
    }

    if (selectedSeason && selectedSeason.TeamDeathmatch) {
      const victoryRate =
        (selectedSeason.TeamDeathmatch.VictoryCount /
          selectedSeason.TeamDeathmatch.PlayCount) *
        100;

      const data = {
        labels: ["Victory", "Loss"],
        datasets: [
          {
            data: [victoryRate, 100 - victoryRate],
            backgroundColor: ["green", "red"],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "90%",
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      const ctx = canvas.getContext("2d");
      window.teamDeathmatchChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });
      canvas.style.display = "block";
    } else {
      canvas.style.display = "none";
      canvas.insertAdjacentHTML(
        "afterend",
        '<div className="no-data-message">전적이 없습니다</div>'
      );
    }
  };

  const renderDeathmatchVictoryRateChart = () => {
    const canvas = document.getElementById("deathmatchVictoryRateChart");
    const existingNoData = canvas.nextElementSibling;

    if (
      existingNoData &&
      existingNoData.classList.contains("no-data-message")
    ) {
      existingNoData.remove();
    }

    if (window.deathmatchChart) {
      window.deathmatchChart.destroy();
    }

    if (selectedSeason && selectedSeason.Deathmatch) {
      const deathmatchData = selectedSeason.Deathmatch;

      const victoryRate =
        (deathmatchData.VictoryCount / deathmatchData.PlayCount) * 100;

      const data = {
        labels: ["Victory", "Loss"],
        datasets: [
          {
            data: [victoryRate, 100 - victoryRate],
            backgroundColor: ["green", "red"],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "90%",
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      const ctx = canvas.getContext("2d");
      window.deathmatchChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });

      canvas.style.display = "block";
    } else {
      canvas.style.display = "none";
      canvas.insertAdjacentHTML(
        "afterend",
        '<div className="no-data-message">전적이 없습니다</div>'
      );
    }
  };

  const renderVictoryRateChart = () => {
    const canvas = document.getElementById("victoryRateChart");
    const existingNoData = canvas.nextElementSibling;

    if (
      existingNoData &&
      existingNoData.classList.contains("no-data-message")
    ) {
      existingNoData.remove();
    }

    if (window.myChart) {
      window.myChart.destroy();
    }

    if (selectedSeason && selectedSeason.TeamElimination) {
      const eliminationData = selectedSeason.TeamElimination;

      const victoryRate =
        (eliminationData.VictoryCount / eliminationData.PlayCount) * 100;

      const data = {
        labels: ["Victory", "Loss"],
        datasets: [
          {
            data: [victoryRate, 100 - victoryRate],
            backgroundColor: ["green", "red"],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "90%",
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      const ctx = canvas.getContext("2d");
      window.myChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });

      canvas.style.display = "block";
    } else {
      canvas.style.display = "none";
      canvas.insertAdjacentHTML(
        "afterend",
        '<div className="no-data-message">전적이 없습니다</div>'
      );
    }
  };

  const handleChangeSeason = (event) => {
    const seasonName = event.target.value;
    setSelectedSeason(
      seasons.find((season) => season.SeasonName === seasonName)
    );
  };
  const params = useParams();

  const getCharacter = async () => {
    // 검색 버튼을 누르면 입력된 value 가져오고 encoded하기
    let encoded = encodeURI(params.name);

    try {
      // api 서버에 요청 보내기
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/armories/characters/${encoded}?filters=profiles%2Bcolosseums`,
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      // 응답 데이터를 상태에 저장
      setLoaResponse(response.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 페이지 이동 후 api 호출
    getCharacter();
  }, []);

  useEffect(() => {
    if (selectedSeason) {
      renderVictoryRateChart();
      renderTeamDeathmatchVictoryRateChart();
      renderDeathmatchVictoryRateChart();
    }
  }, [selectedSeason]);
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn-lostark.game.onstove.com/2018/obt/assets/css/pc.css?20231108113431";
    document.head.appendChild(link);
  });

  // // 기본효과,추가효과 없으면 공백
  // function getEffectValue(tooltip, elementKey) {
  //   if (
  //     tooltip &&
  //     tooltip[elementKey] &&
  //     tooltip[elementKey].value &&
  //     tooltip[elementKey].value.Element_001
  //   ) {
  //     return tooltip[elementKey].value.Element_001;
  //   }
  //   return "";
  // }

  return (
    <div className="lostark-pc lostark-profile">
      <HeaderComponent />
      {loaApiResponse ? (
        <div className="profile-ingame">
          <div className="left">
            <div className="profile-character-info">
              [Lv.{loaApiResponse.ArmoryProfile.CharacterLevel}{" "}
              {loaApiResponse.ArmoryProfile.CharacterName}]{" "}
              <span className="profile-character-info__server">
                @{loaApiResponse.ArmoryProfile.ServerName}
              </span>
            </div>
            <div className="testtest">
              <div className="image-wrapper">
                <img
                  src={loaApiResponse.ArmoryProfile.CharacterImage}
                  alt="Character Image"
                />
              </div>
              <div className="gray-background"></div>
            </div>

            {/* <div className = "testtest">
              <img
                src={loaApiResponse.ArmoryProfile.CharacterImage}
                alt="Character Image"
                style={{
                  maxWidth: "350px",
                  // maxHeight: "270px",
                  // WebkitMaskImage: "linear-gradient(100deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 70%)",
                }}
              />
            </div> */}
            <div className="level-info">
              <div className="level-info__expedition">
                <span>원정대 레벨</span>
                <span>
                  <small>Lv.</small>
                  {loaApiResponse.ArmoryProfile.ExpeditionLevel}
                </span>
              </div>
              <div className="level-info__item">
                <span>전투 레벨</span>
                <span>
                  <small>Lv.</small>
                  {loaApiResponse.ArmoryProfile.CharacterLevel}
                </span>
              </div>
            </div>

            <br></br>

            <div className="level-info2">
              <div className="level-info2__expedition">
                <span>장착 아이템 레벨</span>
                <span>
                  <small>Lv.</small>
                  {loaApiResponse.ArmoryProfile.ItemAvgLevel}
                </span>
              </div>
              <div className="level-info2__item">
                <span>달성 아이템 레벨</span>
                <span>
                  <small>Lv.</small>
                  {loaApiResponse.ArmoryProfile.ItemMaxLevel}
                </span>
              </div>
            </div>

            <div className="game-info">
              <div className="game-info__title">
                <span>칭호</span>{" "}
                <span>{loaApiResponse.ArmoryProfile.Title}</span>
              </div>
              <div className="game-info__guild">
                <span>길드</span>{" "}
                <span>{loaApiResponse.ArmoryProfile.GuildName}</span>
              </div>
              <div className="level-info__pvp">
                <span>PVP</span>{" "}
                <span>{loaApiResponse.ArmoryProfile.PvpGradeName}</span>
              </div>
              <div className="game-info__wisdom">
                <span>영지</span>
                <span>
                  <small>Lv.</small>
                  {loaApiResponse.ArmoryProfile.TownLevel + " "}
                </span>
                <span>{loaApiResponse.ArmoryProfile.TownName}</span>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="gray-box">
              <div className="box-section">
                <p className="label">PvP 정보</p>
                <div className="pvp-info">
                  <div>
                    <h2>현재 시즌 : {mostRecentSeason.SeasonName}</h2>
                    <div className="horizontal-container">
                      <h2>시즌별 pvp 정보</h2>

                      <select onChange={handleChangeSeason}>
                        <option value="">시즌을 고르세요.</option>
                        {seasons.map((season) => (
                          <option
                            key={season.SeasonName}
                            value={season.SeasonName}
                            defaultValue={
                              season.defaultValue === season.SeasonName
                            }
                          >
                            {season.SeasonName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedSeason &&
                    selectedSeason !== mostRecentSeason + 1 ? (
                      <div>
                        <div className="pvp-info">
                          {/* 경쟁전 */}
                          <div
                            style={{ fontWeight: "bold", fontSize: "1.2em" }}
                          >
                            경쟁전
                          </div>
                          <div className="battle-info">
                            <div className="test-box">
                              {selectedSeason.Competitive &&
                              selectedSeason.Competitive.RankIcon ? (
                                <img
                                  src={
                                    selectedSeason.Competitive?.RankIcon ||
                                    "전적 없음."
                                  }
                                  alt="Rank Icon"
                                />
                              ) : (
                                "전적 없음."
                              )}
                              <div>
                                {selectedSeason.Competitive?.RankName ||
                                  "경쟁전에 참가 기록이 없습니다."}
                              </div>
                              <hr></hr>
                              <div>
                                승률:{" "}
                                {selectedSeason.Competitive
                                  ? (
                                      (selectedSeason.Competitive.VictoryCount /
                                        selectedSeason.Competitive.PlayCount) *
                                      100
                                    ).toFixed(1) + "%"
                                  : "-"}
                              </div>
                            </div>
                            <div className="test-box">
                              <div>
                                Kill 수:{" "}
                                {selectedSeason.Competitive?.KillCount || "-"}
                              </div>
                            </div>
                            <div className="test-box">
                              <div>
                                승리 게임{" "}
                                {selectedSeason.Competitive?.VictoryCount ||
                                  "-"}
                              </div>
                              <div>
                                에이스 달성:{" "}
                                {selectedSeason.Competitive?.AceCount || "-"}
                              </div>
                            </div>
                          </div>
                          {/* 섬멸전 */}
                          <div
                            style={{ fontWeight: "bold", fontSize: "1.2em" }}
                          >
                            섬멸전
                          </div>
                          <div className="battle-info">
                            <div className="test-box">
                              <canvas id="teamDeathmatchVictoryRateChart"></canvas>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontSize: "20px",
                                }}
                              >
                                {selectedSeason.TeamDeathmatch
                                  ? (
                                      (selectedSeason.TeamDeathmatch
                                        .VictoryCount /
                                        selectedSeason.TeamDeathmatch
                                          .PlayCount) *
                                      100
                                    ).toFixed(1) + "%"
                                  : ""}
                              </div>
                              {selectedSeason &&
                              selectedSeason.TeamDeathmatch ? (
                                <div>
                                  전적:{" "}
                                  {selectedSeason.TeamDeathmatch?.PlayCount ||
                                    "-"}
                                  전{" "}
                                  {selectedSeason.TeamDeathmatch
                                    ?.VictoryCount || "-"}
                                  승{" "}
                                  {selectedSeason.TeamDeathmatch?.LoseCount ||
                                    "-"}
                                  패
                                </div>
                              ) : (
                                "섬멸전에 참가 기록이 없습니다."
                              )}
                            </div>
                            <div className="test-box">
                              <div>
                                Kill 수 :{" "}
                                {selectedSeason.TeamDeathmatch?.KillCount ||
                                  "-"}
                              </div>
                            </div>
                            <div className="test-box">
                              <div>
                                에이스 달성 :{" "}
                                {selectedSeason.TeamDeathmatch?.AceCount || "-"}
                              </div>
                            </div>
                          </div>
                          {/* 난투전 */}
                          <div
                            style={{ fontWeight: "bold", fontSize: "1.2em" }}
                          >
                            난투전
                          </div>
                          <div className="battle-info">
                            <div className="test-box">
                              <div style={{ position: "relative" }}>
                                <canvas id="deathmatchVictoryRateChart"></canvas>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    fontSize: "20px",
                                  }}
                                >
                                  {selectedSeason.Deathmatch
                                    ? (
                                        (selectedSeason.Deathmatch
                                          .VictoryCount /
                                          selectedSeason.Deathmatch.PlayCount) *
                                        100
                                      ).toFixed(1) + "%"
                                    : ""}
                                </div>
                              </div>
                              {selectedSeason && selectedSeason.Deathmatch ? (
                                <div>
                                  전적:{" "}
                                  {selectedSeason.Deathmatch?.PlayCount || "-"}
                                  전{" "}
                                  {selectedSeason.Deathmatch?.VictoryCount ||
                                    "-"}
                                  승{" "}
                                  {selectedSeason.Deathmatch?.LoseCount || "-"}
                                  패
                                </div>
                              ) : (
                                "난투전에 참가 기록이 없습니다."
                              )}
                            </div>
                            <div className="test-box">
                              <div>
                                Kill 수 :{" "}
                                {selectedSeason.Deathmatch?.KillCount || "-"}
                              </div>
                            </div>
                            <div className="test-box">
                              <div>
                                에이스 달성 :{" "}
                                {selectedSeason.Deathmatch?.AceCount || "-"}
                              </div>
                              <div>
                                승률 :{" "}
                                {(
                                  (selectedSeason.Deathmatch?.VictoryCount /
                                    selectedSeason.Deathmatch?.PlayCount) *
                                  100
                                ).toFixed(1) || "-"}
                                %
                              </div>
                            </div>
                          </div>
                          {/* 대장전 */}
                          <div
                            style={{ fontWeight: "bold", fontSize: "1.2em" }}
                          >
                            대장전
                          </div>
                          <div className="battle-info">
                            <div className="test-box">
                              <canvas id="victoryRateChart"></canvas>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontSize: "20px",
                                }}
                              >
                                {selectedSeason.TeamElimination
                                  ? (
                                      (selectedSeason.TeamElimination
                                        .VictoryCount /
                                        selectedSeason.TeamElimination
                                          .PlayCount) *
                                      100
                                    ).toFixed(1) + "%"
                                  : ""}
                              </div>
                              {selectedSeason &&
                              selectedSeason.TeamElimination ? (
                                <div>
                                  전적:{" "}
                                  {selectedSeason.TeamElimination.PlayCount ||
                                    "-"}
                                  전{" "}
                                  {selectedSeason.TeamElimination
                                    .VictoryCount || "-"}
                                  승{" "}
                                  {selectedSeason.TeamElimination.LoseCount ||
                                    "-"}
                                  패
                                </div>
                              ) : (
                                "대장전에 참가 기록이 없습니다."
                              )}
                            </div>
                            <div className="test-box">
                              <div>
                                Kill 수 :{" "}
                                {selectedSeason.TeamElimination?.KillCount ||
                                  "-"}
                              </div>
                            </div>
                            <div className="test-box">
                              <div>
                                킬뎃 :{" "}
                                {(
                                  selectedSeason.TeamElimination?.KillCount /
                                  selectedSeason.TeamElimination?.DeathCount
                                ).toFixed(1) || "-"}
                              </div>
                              <div>
                                에이스 달성 :{" "}
                                {selectedSeason.TeamElimination?.AceCount ||
                                  "-"}
                              </div>
                              <div>
                                승률 :{" "}
                                {(
                                  (selectedSeason.TeamElimination
                                    ?.VictoryCount /
                                    selectedSeason.TeamElimination?.PlayCount) *
                                  100
                                ).toFixed(1) || "-"}
                                %
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterComponent />
        </div>
      ) : (
        <div>안되는 이유를 찾아라 닝겐아..</div>
      )}
    </div>
  );
};

export default CharacterPage;
