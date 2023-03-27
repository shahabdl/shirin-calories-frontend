import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
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

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = (state, action) => {
    dispatch({
      type: "BLUR",
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
        className={!inputState.isValid && inputState.isTouched && "is-invalid"}
      />
    ) : (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={inputState.value}
        list={props.list}
        className={`${!inputState.isValid && inputState.isTouched && "is-invalid"
          } ${props.type === "checkbox" ? "form-check-input" : "form-control"} ${props.className}` }
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
