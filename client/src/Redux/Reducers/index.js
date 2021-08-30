import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import chatsReducer from "./chatsReducer.js";
import messageReducer from "./messageReducer.js";

export default combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  messages: messageReducer,
});
