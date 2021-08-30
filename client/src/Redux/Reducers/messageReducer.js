import { messageConstants } from "./contants.js";

const initState = [];

const messageReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case messageConstants.GET_MESSAGE_SUCCESS: {
      state = action.payload.data;
      break;
    }
    case messageConstants.GET_MESSAGE_FAILURE: {
      state = initState;
      break;
    }
    case messageConstants.SEND_MESSAGE_SUCCESS: {
      state = [...state, action.payload.data];
      break;
    }
    case messageConstants.GET_A_NEW_MESSAGE_SUCCESS: {
      state = [...state, { _doc: action.payload.data }];
      break;
    }
    default:
  }
  return state;
};

export default messageReducer;
