import { useEffect, useContext } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { fetchAuth } from "../utils/fetch-auth";
import { userContext } from "../../context/user-context";
import Signup from "../components/signup";
import Login from "../components/login";
import { FormInputState } from "../components/signup";
const User = () => {
  const { userState, dispatch } = useContext(userContext);

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>, formState: FormInputState) => {
    e.preventDefault();
    if (formState.isValid) {
      console.log(formState);
      let name, email, password, image;
      name = formState.inputs.user.value;
      email = formState.inputs.email.value;
      password = formState.inputs.password.value;
      image = `random`;

      fetchAuth({
        method: "post",
        url: "http://localhost:5000/user/signup",
        options: {
          useToken: false
        },
        body: JSON.stringify({
          name,
          email,
          password,
          image
        })
      })
        .then(res => { if (res) return res.json() })
        .then(jsonRes => {
          let { userID, email, userName, token, avatar } = jsonRes;
          dispatch({ type: "setUser", payload: { userID, email, userName, userAccessToken: token, userAvatar: avatar } });
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  useEffect(() => {
    //check token authontication
    fetchAuth({ method: "get", url: "/user", options: {}, body: "" })
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: "logOutUser", payload: "" });
        }
      })
      .catch((err) => {
        dispatch({ type: "logOutUser", payload: "" });
      });
  }, []);

  if (userState.userAccessToken === null || userState.userAccessToken === "" || userState.userAccessToken === undefined) {
    return (
      <Router>
        <Switch>
          <Route path="/user/signup">
            <Signup signUpHandler={signUpHandler} />
          </Route>
          <Route path="/user/login">
            <Login />
          </Route>
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
  //check if there is redirect parameter
  //we should check it here because on state change react will re render login page from here and if there isnt any redirect, last return will redirect to "/"
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get("redirectTo");
  if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  }

  return <Redirect to="/" />;
};

export default User;
