import Input from "../common/Input";
import NoticeComponent from "../component/NoticeComponent";
import EventComponent from "../component/EventComponent";
import HeaderComponent from "../component/HeaderComponent";
import FooterComponent from "../component/FooterComponent";
import "../style/Home.css";
import IslandComponent from "../component/IslandComponent";

const Home = () => {
  return (
    <div className="Home_Header">
      <HeaderComponent />

      <div className="Home">
        <div className="Home_Content">
          <div className="Home_Sayhi">
            <h2>안녕하세요, 반갑소이원재요 님!</h2>
          </div>
          <EventComponent />
          <NoticeComponent />
          <IslandComponent />
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default Home;
