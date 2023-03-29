import { useState, useEffect } from "react";
import React from "react";

import "./input-number.css";

interface Props{
  defaultValue? : number,
  canBeNegative?: boolean,
  onChange: Function,
  className?: string
}

const InputNumber = ({defaultValue = 0, canBeNegative = false, onChange, className}:Props) => {

  const [inputValue, setInputValue] = useState<number>(defaultValue);

  const decNumber = () => {
    if (canBeNegative) {
      setInputValue(inputValue - 1)
    } else {
      if (inputValue >= 1) setInputValue(inputValue - 1);
    }
  };
  const incNumber = () => {
    setInputValue(inputValue + 1);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      let floatTargetValue = parseFloat(e.target.value);
      onChange(floatTargetValue);
      setInputValue(floatTargetValue);
    }
  };

  useEffect(() => {
    if (!isNaN(defaultValue))
      setInputValue(defaultValue);
  }, [defaultValue])


  return (
    <div className={"w-[100%] flex " + className}>
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
