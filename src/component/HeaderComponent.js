import "../style/HeaderComponent.css";
import Input from "../common/Input";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header className="HeaderComponent">
      <div className="HeaderContainer">
        <span>
          <Link to={"http://localhost:3001/"}>로코코</Link>
        </span>
        <nav className="HeaderNav">
          <Link to={"http://localhost:3000/post"}>가이드</Link>
          <Link to={"http://localhost:3000/skilldb"}>스킬DB</Link>
        </nav>
        <Input />
      </div>
    </header>
  );
};

export default HeaderComponent;
