import axios from "axios";
import { authConstants } from "../Reducers/contants";

export const getProfileDataAction = () => {
  return async (dispatch) => {
    const res = await axios.get("/profile");
    if (res) {
      if (res.status === 200 || res.status === 304) {
        dispatch({
          type: authConstants.GET_PROFILE_DATA_SUCCESS,
          payload: { data: res.data },
        });
        return true;
      }
    } else {
      dispatch({
        type: authConstants.GET_PROFILE_DATA_FAILURE,
      });
    }
  };
};
