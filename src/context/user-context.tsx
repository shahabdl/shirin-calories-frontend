import { createContext, useReducer } from "react";
import React from "react";

interface StateType {
  userName: string | null,
  userID: string | null
  userEmail: string | null,
  userAccessToken: string | null,
  userAvatar: {
    image: string | null,
    type: string | null
  },
  userSettings: {
    darkMode: string | null
  },
}

interface action {
  type: string,
  payload: any
}

const initialUserState: StateType = {
  userName: window.localStorage.getItem("_user_name"),
  userID: window.localStorage.getItem("_uuid"),
  userEmail: window.localStorage.getItem("_email"),
  userAccessToken: window.localStorage.getItem("_access_token"),
  userAvatar: { image: "", type: "svg" },
  userSettings: {
    darkMode: window.localStorage.getItem("dark_mode"),
  },
};

const userContext = createContext(null);

const setUser = (state: StateType, action: action) => {
  let tempState = { ...state };
  tempState.userName = action.payload.userName;
  tempState.userID = action.payload.userID;
  tempState.userEmail = action.payload.email;
  tempState.userAccessToken = action.payload.userAccessToken;
  tempState.userAvatar.image = action.payload.userAvatar.image;
  tempState.userAvatar.type = action.payload.userAvatar.type;

  window.localStorage.setItem("_user_name", action.payload.userName);
  window.localStorage.setItem("_uuid", action.payload.userID);
  window.localStorage.setItem("_email", action.payload.email);
  window.localStorage.setItem("_access_token", action.payload.userAccessToken);
  return tempState;
};

const logOutUser = (state: StateType) => {
  window.localStorage.removeItem("_access_token");
  window.localStorage.removeItem("_email");
  window.localStorage.removeItem("_uuid");
  window.localStorage.removeItem("_user_name");

  let tempState = { ...state };
  tempState.userID = "";
  tempState.userEmail = "";
  tempState.userAccessToken = "";
  tempState.userName = "";
  tempState.userAvatar = { image: "", type: "svg" };
  return tempState;
};

const changeDarkMode = (state: StateType, action: action) => {
  let tempState = { ...state };
  tempState.userSettings = { darkMode: action.payload };
  window.localStorage.setItem("_dark_mode", action.payload);
  return tempState;
};

const userReducer = (userState: StateType, action: action) => {
  switch (action.type) {
    case "setUser":
      return setUser(userState, action);
    case "logOutUser":
      return logOutUser(userState);
    case "changeDarkMode":
      return changeDarkMode(userState, action);
    default:
      return userState;
  }
};

interface Props {
  children: React.ReactNode,
  testValue: any
}

const UserProvider = ({ children, testValue }: Props) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);
  return (
    <userContext.Provider value={testValue ? { ...testValue, dispatch } : { userState, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };
