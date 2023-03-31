import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";

interface State {
  value: string,
  isTouched: boolean,
  isValid: boolean,
}

interface Action {
  type: string,
  val: string,
  validators: Array<{ type: string, val?: number }>
}

interface Props {
  id: string,
  onInput: Function,
  validators: Array<{ type: string, val?: number }>,
  element: string,
  type: string,
  rows?: number,
  placeholder: string,
  errorText: string,
  className: string
}

const inputStateInitialise: State = {
  value: "",
  isTouched: false,
  isValid: false,
}

const inputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val ? action.val : "",
        isValid: validate(action.val , action.validators),
      };
    case "BLUR": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props: Props) => {
  const [inputState, dispatch] = useReducer(inputReducer, inputStateInitialise);

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = () => {
    dispatch({
      type: "BLUR",
      val: "",
      validators: []
    });
  };

  const element =
    props.element === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={!inputState.isValid ? (inputState.isTouched ? "is-invalid" : "") : ""}
      />
    ) : (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={inputState.value}
        className={`${!inputState.isValid && inputState.isTouched && "is-invalid"
          } ${props.type === "checkbox" ? "form-check-input" : "form-control"} ${props.className}`}
      />
    );
  return (
    <div>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="invalid-feedback"> {props.errorText} </p>
      )}
    </div>
  );
};

export default Input;
