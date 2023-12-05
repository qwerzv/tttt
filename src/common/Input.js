import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const [characterName, setCharacterName] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setCharacterName(e.target.value);
  };

  // 제출시 페이지 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/character/${characterName}`);
  };

  return (
    <div className="Input">
      <div className="InputContainer">
        {/* <img
          src="https://github.com/moonnu/react-exam/assets/86511086/451101aa-ac8b-4ba2-92f6-b42457d1df68"
          width="350"
          height="350"
          alt="lococo"
        ></img> */}
        <form onSubmit={handleSubmit}>
          <div className="InputLabel">
            <label>Search</label>
          </div>
          <div className="InputSearch">
            <input
              onChange={onChange}
              value={characterName}
              placeholder="캐릭터명을 입력하세요."
            />
            {/* <button type="submit">검색</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Input;
