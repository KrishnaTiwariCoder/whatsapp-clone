import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PusherJS from "pusher-js";
import {
  getAMessage,
  getMessageBetweenPeople,
  sendAMessage,
} from "../Redux/Actions/MessagesActions";
import "./Chats.css";
import { getANewChat } from "../Redux/Actions/ChatsAction";

const pusher = new PusherJS("70a2121f2270af2d706f", {
  cluster: "eu",
});
const Chats = ({ plain }) => {
  const { auth, messages, chats } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { chatId } = useParams();
  const [typed_message, setTyped_message] = useState("");

  const send_a_message = (e) => {
    e.preventDefault();
    dispatch(
      sendAMessage(
        typed_message,
        auth._id,
        messages[0]._doc.receiver.id === auth._id
          ? messages[0]._doc.sender.email
          : messages[0]._doc.receiver.email
      )
    );
    setTyped_message("");
  };

  useEffect(() => {
    if (chatId) {
      dispatch(getMessageBetweenPeople(auth._id, chatId));
    }
  }, [chatId]);

  const getChatPeopleDetails = (anyMessage) => {
    if (auth._id === anyMessage.sender.id) {
      return {
        image: anyMessage.receiver.image,
        name: anyMessage.receiver.name,
        email: anyMessage.receiver.email,
      };
    } else {
      return {
        image: anyMessage.sender.image,
        name: anyMessage.sender.name,
        email: anyMessage.sender.email,
      };
    }
  };

  useEffect(() => {
    var channel = pusher.subscribe("message");

    channel.bind(auth._id, function (data) {
      if (messages.length > 0) {
        if (window.location.href.split("/")[4] === data.sender.id) {
          dispatch(getAMessage(data));
        }
      }

      if (!chats.find((chat) => chat._id === data.sender.id)) {
        dispatch(getANewChat(data.sender));
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="chats">
      {!plain ? (
        <>
          <div className="chats__header">
            <Avatar
              src={messages[0] && getChatPeopleDetails(messages[0]._doc).image}
            />
            <div className="chats__headerPeopleInfo">
              <h3>
                {messages[0] &&
                  getChatPeopleDetails(messages[0] && messages[0]._doc).name}
              </h3>
            </div>
            <div className="chats__headerOptions">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chats__body">
            {messages.map((message) => (
              <p
                className={`chat__message ${
                  auth._id === message._doc.sender.id ? `chat__sender` : null
                }`}
                key={message._doc._id}
              >
                <span className="chat__name">{message._doc.sender.name}</span>
                {message._doc.message}
                <span className="chat__timestamps">
                  {message._doc.createdAt.toLocaleString()}
                </span>
              </p>
            ))}
          </div>
          <div className="chat__footer">
            <InsertEmoticon />
            <form onSubmit={send_a_message}>
              <input
                type="text"
                name="message"
                id="chat__footer__input"
                placeholder="Type a message..."
                value={typed_message}
                onChange={(e) => setTyped_message(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
            <Mic />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Chats;
