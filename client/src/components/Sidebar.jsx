import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addNewChatAction } from "../Redux/Actions/ChatsAction";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { auth, chats } = useSelector((state) => state);
  const logOut = async () => {
    const res = await axios.get("/auth/logout");
    if (res.status === 302 || res.status === 200) {
      window.location.href = "/";
    }
  };
  const addNewChat = () => {
    let receiverEmail = prompt("Receiver's registered email id");
    if (receiverEmail && receiverEmail !== auth.email) {
      if (!chats.find((chat) => chat.email === receiverEmail)) {
        let startingMessage = prompt("Simple starting message");
        if (startingMessage) {
          dispatch(addNewChatAction(startingMessage, auth._id, receiverEmail));
        }
      } else {
        alert("Already in the chats send it directly");
      }
    } else {
      alert("You can't send a message to yourself");
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={auth.image} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={() => addNewChat()}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="sidebar__chats">
        {chats.map((elm) => {
          return (
            <SidebarChat
              key={elm._id ? elm._id : elm.id}
              chatName={
                elm.firstName ? `${elm.firstName} ${elm.lastName}` : elm.name
              }
              lastMessage={`last message`}
              receiverId={elm._id ? elm._id : elm.id}
              image={elm.image}
            />
          );
        })}
        <button onClick={() => logOut()}>Log out</button>
      </div>
    </div>
  );
};

export default Sidebar;
