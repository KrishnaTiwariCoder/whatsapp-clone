import axios from "axios";
import { messageConstants } from "../Reducers/contants";

export const getMessageBetweenPeople = (senderId, receiverId) => {
  return async (dispatch) => {
    const res = await axios.post("/chatsBetweenPeople", {
      senderId,
      receiverId,
    });
    if (res) {
      if (res.status === 200 || res.status === 304) {
        dispatch({
          type: messageConstants.GET_MESSAGE_SUCCESS,
          payload: { data: res.data },
        });
      }
    } else {
      dispatch({ type: messageConstants.GET_MESSAGE_FAILURE });
    }
  };
};

export const sendAMessage = (message, senderId, receiverEmail) => {
  return async (dispatch) => {
    const res = await axios.post("/sendMessage", {
      message,
      senderId,
      receiverEmail,
    });
    // console.log(res);
    if (res) {
      if (res.status === 200) {
        dispatch({
          type: messageConstants.SEND_MESSAGE_SUCCESS,
          payload: { data: res.data },
        });
      }
    }
  };
};

export const getAMessage = (newMessage) => {
  return (dispatch) => {
    dispatch({
      type: messageConstants.GET_A_NEW_MESSAGE_SUCCESS,
      payload: { data: newMessage },
    });
  };
};
