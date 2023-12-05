import EditItem from "./EditItem";

// 글 작성
const EditList = ({ onDelete, editList }) => {
  // 데이터 들어오는지 콘솔찍기
  console.log(editList);

  return (
    <div className="EditList ">
      <h4>{editList.length}개의 운영 팁</h4>
      {/* 배열을 리스트로 렌더링 */}
      <div>
        {editList.map((it) => (
          <EditItem key={it.id} {...it} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

// props가 전달이 안 될 때를 대비
EditList.defaultProps = {
  editList: [],
};

export default EditList;
