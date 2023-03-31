import React, { useState, useRef, useEffect } from "react";

interface Props {
  options: Array<string>,
  className?: string,
  defaultValue?: string | number,
  renderTop?: boolean,
  onSelect: Function
}

const DropdownList = ({ options, className = "", defaultValue = 0, renderTop = false, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>(typeof defaultValue === "number" ? defaultValue : 0);
  const [showDropList, setShowDropList] = useState(false);
  const [defaultValueVal, setDefaultValueVal] = useState<string | number>(defaultValue)

  const toggleDropList = () => {
    setShowDropList(!showDropList);
  };

  const itemClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentItem = e.currentTarget.parentElement;
    for (let child in parentItem?.children) {
      let childElement = parentItem?.children[parseInt(child)];
      childElement?.classList.remove(
        "bg-secondary",
        "dark:bg-secondary-dark",
      );
      childElement?.classList.add("bg-primary", "dark:bg-primary-dark");
    }
    e.currentTarget.classList.remove(
      "bg-primary",
      "dark:bg-primary-dark"
    );
    e.currentTarget.classList.add(
      "bg-secondary",
      "dark:bg-secondary-dark",
    );
    let indexNumber = e.currentTarget.getAttribute("data-index");
    if (indexNumber !== null) {
      setSelectedOption(parseInt(indexNumber));
    }
    setShowDropList(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (showDropList && ref.current && !ref.current.contains(e.target as Node)) {
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
        let index = options.indexOf(defaultValue);
        setSelectedOption(index);
      } else {
        setSelectedOption(0);
      }
    }
    else {
      onSelect(options[selectedOption]);
    }
  }, [defaultValueVal])

  useEffect(() => {
    if (defaultValue !== defaultValueVal) {
      setDefaultValueVal(defaultValue);
    }
  }, [defaultValue])

  useEffect(() => {
    onSelect(options[selectedOption]);
  }, [selectedOption])


  return (
    <div ref={ref} className={"w-[100%] z-90 " + className}>
      <button
        name="dropdown-list"
        onClick={toggleDropList}
        className={
          "bg-white px-2 py-1 border-solid border-[1px] border-border dark:border-border-dark rounded-lg font-light w-[100%] text-left flex bg-primary dark:bg-primary-dark cursor-pointer"
        }
      >
        {options[selectedOption]}
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
      </button>

      <div
        data-testid="dropdown-options"
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
                  data-testid={`option-${option}`}
                  data-index={i}
                  key={option + i}
                  className={
                    (selectedOption === i
                      ? "bg-secondary dark:bg-secondary-dark text-white"
                      : "bg-primary dark:bg-primary-dark") +
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
