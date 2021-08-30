import React from "react";
import "./HomePage.css";
import { GoogleLogin } from "react-google-login";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authConstants } from "../Redux/Reducers/contants";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const googleAuthSignin = async ({ profileObj }) => {
    axios
      .post("/auth/google/signin", {
        googleId: profileObj.googleId,
        email: profileObj.email,
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: authConstants.GET_PROFILE_DATA_SUCCESS,
            payload: { data: res.data },
          });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const googleAuthSignup = async ({ profileObj }) => {
    // console.log(Something);
    axios
      .post("/auth/google/signup", {
        googleId: profileObj.googleId,
        email: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        image: profileObj.imageUrl,
      })
      .then((res) => {
        if (res.status !== 201) return console.log("Sonething went wrong :(");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <GoogleLogin
        clientId="678625763284-od44lnbg4cs6nelik9rpe1ravuv505ge.apps.googleusercontent.com"
        onSuccess={googleAuthSignin}
        onFailure={googleAuthSignin}
        cookiePolicy={"single_host_origin"}
      />
      <GoogleLogin
        clientId="678625763284-od44lnbg4cs6nelik9rpe1ravuv505ge.apps.googleusercontent.com"
        onSuccess={googleAuthSignup}
        onFailure={googleAuthSignup}
        cookiePolicy={"single_host_origin"}
      >
        <span>Sign Up with Google</span>
      </GoogleLogin>
    </>
  );
};

export default HomePage;
