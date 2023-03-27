import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/user-context";
import { fetchAuth } from "../utils/fetch-auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(userContext);
  const [error, setError] = useState("");

  const handleLogin = (authRes) => {
    //if loggin failed we have to remove access token.
    if (!authRes) {
      dispatch({ type: "logOutUser", payload: "" });
      return;
    }
    //putting user data in context
    console.log(authRes);
    dispatch({
      type: "setUser",
      payload: {
        userID: authRes.userID,
        email: authRes.email,
        userAccessToken: authRes.token,
        userName: authRes.userName,
        userAvatar:{image:authRes.avatar.image, type:authRes.avatar.type}
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAuth({
      method: "post",
      url: "http://localhost:5000/user/login",
      options: { useToken: false },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((resJson) => {
        if (resJson) {
          if (resJson.error) {
            setError(resJson.error);
            return;
          }
          handleLogin(resJson);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "logOutUser", payload: "" });
      })
  };

  const changeHandler = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  useEffect(()=>{
    if(error !== ""){
      setTimeout(()=>{
        setError("");
      },2000)
    }
  },[error])

  return (
    <div className="w-[100%] h-[100%] grid items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-primary dark:bg-primary-dark grid gap-5 p-5 rounded-lg shadow-lg dark:shadow-none border-[1px] border-border dark:border-border-dark"
      >
        <h1 className="border-b-2 pb-4 border-border dark:border-border-dark">
          Login
        </h1>
        {error? <h2>{error}</h2> : ""}
        <input
          type="email"
          placeholder="Email"
          onChange={changeHandler}
          className="bg-primary dark:bg-primary-dark border-border border-[1px] p-1 rounded-md dark:border-border-dark text-text dark:text-text-dark dark:hover:bg-hover-dark hover:bg-border transition-colors focus-visible:outline-none focus-visible:bg-border dark:focus-within:bg-hover-dark"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={changeHandler}
          className="bg-primary dark:bg-primary-dark border-border border-[1px] p-1 rounded-md dark:border-border-dark text-text dark:text-text-dark dark:hover:bg-hover-dark hover:bg-border transition-colors focus-visible:outline-none focus-visible:bg-border dark:focus-within:bg-hover-dark"
        />
        <button
          type="submit"
          className="bg-button dark:bg-button-dark text-primary dark:text-text-dark p-2 rounded-lg dark:hover:bg-secondary transition-colors hover:bg-button-dark"
        >
          submit
        </button>
        <p>Don't have an account? <a href="/user/signup" className="text-button dark:text-button-dark">Sign Up</a> </p>
      </form>
    </div>
  );
};

export default Login;
