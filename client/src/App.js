import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Rooms from "./pages/Rooms";
import HomePage from "./pages/HomePage";
import { getProfileDataAction } from "./Redux/Actions/AuthActions";
import { getChatsAction } from "./Redux/Actions/ChatsAction";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  axios.defaults.baseURL = "/api";

  useEffect(() => {
    dispatch(getProfileDataAction()).then((res) => {
      if (!res) {
        return <Redirect to="/" />;
      }
    });
  }, []);
  if (auth._id) {
    dispatch(getChatsAction(auth._id));
  }
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__body">
          {auth._id ? (
            <Switch>
              <Route exact path="/">
                <Rooms plain={true} />
              </Route>
              <Route exact path={"/room/:chatId"}>
                <Rooms plain={false} />
              </Route>
            </Switch>
          ) : (
            <HomePage />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
