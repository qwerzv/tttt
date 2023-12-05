const EditItem = ({ id, author, content, create_date, onDelete }) => {
  return (
    <div className="EditItem">
      <div className="info">
        <span>작성자: {author}</span>
        <br />
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button
        onClick={() => {
          // 확인, 취소 버튼 띄우기
          if (window.confirm(`${id}번째 운영 팁을 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default EditItem;
