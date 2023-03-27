import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/formElements/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { fetchAuth } from "../utils/fetch-auth";


const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Signup = (props) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      user: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });
  const signUpHandler = (e) => {
    props.signUpHandler(e, formState);
  }
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  return (
    <div className="w-[100%] h-[100%] grid items-center justify-center">

      <form
        className="bg-primary dark:bg-primary-dark grid gap-5 p-5 rounded-lg shadow-lg dark:shadow-none border-[1px] border-border dark:border-border-dark"
        onSubmit={signUpHandler}>
        <h1 className="border-b-2 pb-4 border-border dark:border-border-dark">
          Sign up
        </h1>
        {!formState.isValid && (
          <p className="text-[red]">Some rows are not valid!</p>
        )}
        <div className="grid gap-4">
          <Input
            id="user"
            type="text"
            element="input"
            placeholder="UserName"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a Username"
            className="bg-primary dark:bg-primary-dark border-border border-[1px] p-1 rounded-md dark:border-border-dark text-text dark:text-text-dark dark:hover:bg-hover-dark hover:bg-border transition-colors focus-visible:outline-none focus-visible:bg-border dark:focus-within:bg-hover-dark"
          />
          <Input
            id="email"
            type="text"
            element="input"
            placeholder="Email"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="This is not a valid Email Address"
            className="bg-primary dark:bg-primary-dark border-border border-[1px] p-1 rounded-md dark:border-border-dark text-text dark:text-text-dark dark:hover:bg-hover-dark hover:bg-border transition-colors focus-visible:outline-none focus-visible:bg-border dark:focus-within:bg-hover-dark"
          />
          <Input
            id="password"
            type="text"
            element="input"
            placeholder="Password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Password must be atleast 8 Characters long"
            className="bg-primary dark:bg-primary-dark border-border border-[1px] p-1 rounded-md dark:border-border-dark text-text dark:text-text-dark dark:hover:bg-hover-dark hover:bg-border transition-colors focus-visible:outline-none focus-visible:bg-border dark:focus-within:bg-hover-dark"
          />
        </div>
        <button
          className="bg-button dark:bg-button-dark text-primary dark:text-text p-2 rounded-lg dark:hover:bg-secondary transition-colors hover:bg-button-dark disabled:bg-hover-dark dark:disabled:bg-icon-color-dark"
          type="submit"
          disabled={!formState.isValid}
        >
          Sign up
        </button>
        <p>Already have an account? <a href="/user/login" className="text-button dark:text-button-dark">Sign In</a> </p>

      </form>
    </div>
  );
};

export default Signup;
