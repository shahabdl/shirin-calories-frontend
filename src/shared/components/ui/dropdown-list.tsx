import React, { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  options: Array<string>,
  className: string,
  defaultValue: string | number,
  renderTop: boolean,
  onSelect: Function
}

const DropdownList = ({ options, className, defaultValue, renderTop, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showDropList, setShowDropList] = useState(false);

  const onSelectFunction = useCallback((selection: string) => {
    if (typeof (onSelect) === "function") {
      onSelect(selection);
    }
  }, [])

  const toggleDropList = () => {
    setShowDropList(!showDropList);
  };

  const itemClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentItem = e.currentTarget.parentElement;

    for (let child in parentItem?.children) {
      let childElement = parentItem?.children[parseInt(child)];
      childElement?.classList.remove(
        "bg-secondary",
        "text-hover",
        "dark:bg-secondary-dark",
        "dark:text-hover-dark"
      );
      childElement?.classList.add("text-text", "bg-primary", "dark:bg-primary-dark");
    }
    e.currentTarget.classList.remove(
      "text-text",
      "bg-primary",
      "dark:bg-primary-dark"
    );
    e.currentTarget.classList.add(
      "bg-secondary",
      "text-hover",
      "dark:bg-secondary-dark",
      "dark:text-text-dark"
    );
    let indexNumber = e.currentTarget.getAttribute("index");
    console.log(indexNumber);

    if (indexNumber) {
      setSelectedOption(parseInt(indexNumber));
    }
    setShowDropList(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (showDropList && ref.current && !ref.current.contains(e.currentTarget as Node)) {
        setShowDropList(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropList]);

  useEffect(() => {
    if (typeof defaultValue === "string" && isNaN(parseInt(defaultValue))) {
      if (options.includes(defaultValue)) {
        setSelectedOption(options.indexOf(defaultValue));
        onSelectFunction(options[options.indexOf(defaultValue)]);
      } else {
        setSelectedOption(0);
        onSelectFunction(options[0]);
      }
    }
    else {
      onSelectFunction(options[selectedOption]);
    }
  }, [defaultValue])

  return (
    <div ref={ref} className={"w-[100%] z-90 " + className}>
      <div
        onClick={toggleDropList}
        className={
          "bg-white px-2 py-1 border-solid border-[1px] border-border dark:border-border-dark rounded-lg font-light w-[100%] text-left flex bg-primary dark:bg-primary-dark cursor-pointer"
        }
      >
        <span className="-translate-y-[2px]">{options[selectedOption]}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-6 h-6 ml-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>

      <div
        className={
          (showDropList ? "" : "hidden ") + " relative overflow-y-visible z-10"
        }
      >
        <div
          className={
            (renderTop
              ? "bottom-[calc(-100%+30px)] rounded-t-lg"
              : "top-[-6px] rounded-b-lg") +
            " absolute bg-background dark:bg-primary-dark border-solid border-[1px] border-border z-10 dark:border-border-dark overflow-auto max-h-[104px] w-[100%] p-1"
          }
        >
          {options.length
            ? options.map((option, i) => {
              return (
                <div
                  data-index={i}
                  key={option + i}
                  className={
                    (selectedOption === i
                      ? "bg-secondary dark:bg-secondary-dark text-white"
                      : "bg-background dark:bg-primary-dark") +
                    " cursor-pointer font-light p-1 rounded-md hover:bg-secondary dark:hover:bg-secondary-dark hover:text-hover dark:hover:text-text-dark transition-colors"
                  }
                  onClick={itemClickHandler}
                >
                  {option}
                </div>
              );
            })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default DropdownList;
