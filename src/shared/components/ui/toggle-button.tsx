import { useEffect, useState } from "react";
import React from "react";
import SvgIcon from "./icons";

interface Props {
    checkedIcon?: string,
    unCheckedIcon?: string,
    onChange: Function,
    defaultState?: boolean,
    className?: string
}

const ToggleButton = ({ checkedIcon = "", unCheckedIcon = "", onChange, defaultState = false, className = "" }: Props) => {
    const [checked, setChecked] = useState(defaultState);

    const toggleStateHandler = () => {
        onChange(!checked);
        setChecked(!checked);
    }

    useEffect(() => {
        setChecked(defaultState);
    }, [])

    return (
        <button
            data-state={checked}
            onClick={toggleStateHandler}
            className={`dark:bg-secondary-dark bg-button-dark w-[60px] h-[30px] border-border dark:border-border-dark border-[1px] rounded-full relative cursor-pointer transition-colors duration-300 ${className}`}>
            <div
                className={`${checked ? "left-[2px]" : "left-[calc(100%-26px)]"} absolute top-[50%] translate-y-[-50%] w-[24px] h-[24px] rounded-full dark:bg-primary-dark bg-primary border-border dark:border-border-dark border-[1px] transition-[left] duration-300 grid items-center justify-center`}
            >
                {checked ? <SvgIcon icon={checkedIcon} width="15" height="15" className="fill-text dark:fill-text-dark" /> : <SvgIcon icon={unCheckedIcon} width="15" height="15" className="fill-text dark:fill-text-dark" />}
            </div>
        </button>
    )
}

export default ToggleButton;