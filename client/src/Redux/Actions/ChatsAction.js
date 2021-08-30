import axios from "axios";
import { chatConstants } from "../Reducers/contants";

export const getChatsAction = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/previousChats/${id}`);
    if (res) {
      if (res.status === 200 || res.status === 304) {
        dispatch({
          type: chatConstants.GET_CHATS_SUCCESS,
          payload: { data: res.data },
        });
      }
    }
  };
};

export const addNewChatAction = (message, senderId, receiverEmail) => {
  return (dispatch) => {
    axios
      .post("/sendMessage", {
        message,
        senderId,
        receiverEmail,
      })
      .then((res) => {
        if (res) {
          if (res.status === 200) {
            dispatch({
              type: chatConstants.ADD_NEW_CHAT_SUCCESS,
              payload: { data: res.data._doc.receiver },
            });
          } else {
            dispatch({
              type: chatConstants.ADD_NEW_CHAT_FAILURE,
            });
            alert("PLease enter a valid receiver email !! ");
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: chatConstants.ADD_NEW_CHAT_FAILURE,
        });
        alert("PLease enter a valid receiver email !! ");
      });
  };
};

export const getANewChat = (sidebarData) => {
  return (dispatch) => {
    dispatch({
      type: chatConstants.ADD_NEW_CHAT_SUCCESS,
      payload: { data: sidebarData },
    });
  };
};
