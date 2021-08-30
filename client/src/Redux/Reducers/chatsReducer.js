import { chatConstants } from "./contants.js";

const initState = [];

const chatsReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case chatConstants.GET_CHATS_SUCCESS: {
      state = action.payload.data;
      break;
    }
    case chatConstants.GET_CHATS_FAILURE: {
      state = initState;
      break;
    }
    case chatConstants.ADD_NEW_CHAT_SUCCESS: {
      state = [...state, action.payload.data];
      break;
    }
    default:
  }
  return state;
};

export default chatsReducer;
