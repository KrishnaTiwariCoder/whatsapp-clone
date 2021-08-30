import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./SidebarChat.css";
const SidebarChat = ({ chatName, lastMessage, receiverId, image }) => {
  const history = useHistory();
  const goToMessages = () => {
    history.push(`/room/${receiverId}`);
  };
  return (
    <div className="sidebarChat" onClick={goToMessages}>
      <Avatar src={image} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
