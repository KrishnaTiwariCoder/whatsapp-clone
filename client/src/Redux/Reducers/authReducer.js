import { authConstants } from "./contants.js";

const initState = {
  googleId: "",
  id: "",
  firstName: "",
  lastName: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.GET_PROFILE_DATA_SUCCESS: {
      state = action.payload.data;
      break;
    }
    case authConstants.GET_PROFILE_DATA_FAILURE: {
      state = initState;
      break;
    }
    default:
  }
  return state;
};

export default authReducer;
