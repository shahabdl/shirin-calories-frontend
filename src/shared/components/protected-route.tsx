import React, { ReactElement, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { fetchAuth } from "../../user/utils/fetch-auth";
import { userContext } from "../../context/user-context";

interface PropsType{
  children: ReactElement,
  redirect: boolean
}

const ProtectedRoute = ({ children, redirect }:PropsType) => {
  const { userState, dispatch } = useContext(userContext);

  useEffect(() => {
    //check token authontication
    fetchAuth({ method: "get", url: "/user" })
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: "logOutUser", payload: "" });
          return;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          dispatch({
            type: "setUser",
            payload: {
              userName: res.userName,
              userID: res.userID,
              userAccessToken: res.token,
              email: res.email,
              userAvatar: { image: res.avatar.image, type: res.avatar.type }
            },
          });

        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "logOutUser", payload: "" });
      });
  }, []);

  if (userState.userAccessToken) {
    return children;
  }

  //if redirect prop is true (or is available) we should send "redirectTo" GET paramater with current url as value to login page
  //so after login it will redirect to current page
  return (
    <Redirect
      to={
        "/user/login" +
        (redirect ? "?redirectTo=" + window.location.pathname : "")
      }
    />
  );
};

export default ProtectedRoute;
