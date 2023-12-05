import { useRef, useState } from "react";
import EditList from "./EditList";

const Edit = ({ onCreate, onDelete, editList }) => {
  // 작성자, 본문 -> 서로 완전히 동일한 형태의 상태를 가짐
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");

  // state를 하나로 묶어줄 수 있다. (skill)
  const [state, setState] = useState({
    author: "",
    content: "",
  });

  // DOM 접근 가능하게 한다.
  const authorInput = useRef();
  const contentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      /* 
      ...state
      위 스프레드 연산자를 통해 모든 state의 기본값을 뿌려준다. 업데이트의 순서는 위에서 아래이므로 
      만약 코드의 아래에 있다면 target.value로 값을 받아도 다시 기존의 state 값으로 업데이트 되기 때문에
      항상 업데이트하는 코드의 위에 있어야한다.              
      */
      ...state,
      /*
      괄호표기법을 사용하여 name이 'author' 라면 'author' 의 value 를 바꾼다.
      */
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content);
    alert("저장 성공!");
  };

  return (
    <div className="Edit">
      <h2>운영 팁</h2>
      {/* author form */}
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      {/* multi-line form */}
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      {/* save-button */}
      <div>
        <button onClick={handleSubmit}>작성하기</button>
      </div>
      <EditList editList={editList} onDelete={onDelete} />
    </div>
  );
};

export default Edit;
