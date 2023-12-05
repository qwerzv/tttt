import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRef, useState } from "react";
import "./App.css";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Tip from "./pages/Tip";
import CharacterPage from "./pages/CharacterPage";
import EventComponent from "./component/EventComponent";

function App() {
  const [data, setData] = useState([]);

  // id 의 기본값은 0으로
  const dataId = useRef(1);

  // 새로운 글을 추가하는 함수
  const onCreate = (author, content) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      create_date,
      id: dataId.current,
    };
    dataId.current += 1;

    // 새로운 게시글을 위에 추가하려면 첫인덱스로
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);

    // 삭제할 id 가 아닌 것들만 새로운 리스트에 저장하기
    const newEditList = data.filter((it) => it.id !== targetId);
    setData(newEditList);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tip" element={<Tip />} />
          <Route
            path="/edit"
            element={
              <Edit onCreate={onCreate} onDelete={onDelete} editList={data} />
            }
          />
          <Route path="/character/:name" element={<CharacterPage />} />
          <Route path="/component/event" element={<EventComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
