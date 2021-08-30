import "../App.css";
import Chats from "../components/Chats";
import Sidebar from "../components/Sidebar";

function Rooms({ plain }) {
  return (
    <>
      <Sidebar />
      <Chats plain={plain} />
    </>
  );
}

export default Rooms;
