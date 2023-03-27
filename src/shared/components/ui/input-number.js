import { useState, useEffect } from "react";

import "./input-number.css";

const InputNumber = (props) => {
  const onChange = props.onChange;

  const [inputValue, setInputValue] = useState(props.defaultValue ? props.defaultValue : "0");

  const decNumber = () => {
    if (props.canBeNegative) {
      setInputValue(parseFloat(inputValue) - 1)
    } else {
      if (inputValue >= 1) setInputValue(parseFloat(inputValue) - 1);
    }
  };
  const incNumber = () => {
    setInputValue(parseFloat(inputValue) + 1);
  };

  const onChangeHandler = (e) => {
    if (e.target.value !== "") setInputValue(parseFloat(e.target.value));
  };

  useEffect(() => {
    if (onChange) {
      return onChange(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!isNaN(props.defaultValue))
      setInputValue(props.defaultValue);
  }, [props.defaultValue])


  return (
    <div className={"w-[100%] flex " + props.className}>
      <div
        className="grid items-center w-[40px] border-[1px] border-border dark:border-border-dark rounded-l-lg bg-primary dark:bg-primary-dark hover:bg-background dark:hover:bg-background-dark select-none text-center cursor-pointer transition-colors"
        onClick={decNumber}
      >
        -
      </div>
      <input
        aria-label="number-input-box"
        className="arrow-none w-[calc(100%-40px)] focus-visible:outline-none bg-primary dark:bg-primary-dark focus-visible:bg-background focus-visible:dark:bg-background-dark border-[1px] border-border dark:border-border-dark py-1 px-2 border-x-0 text-center transition-colors"
        value={inputValue}
        onChange={onChangeHandler}
        type={"number"}
      />
      <div
        className="grid items-center w-[40px] border-[1px] border-border dark:border-border-dark rounded-r-lg bg-primary dark:bg-primary-dark hover:bg-background dark:hover:bg-background-dark select-none text-center cursor-pointer transition-colors"
        onClick={incNumber}
      >
        +
      </div>
    </div>
  );
};

export default InputNumber;
