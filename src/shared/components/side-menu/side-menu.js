import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SvgIcon from "../ui/icons";

import "./side-menu.css";

const SideMenu = (props) => {
  const [wideMenu, setWideMenu] = useState(false);

  return (
    <div
      className={
        (wideMenu ? "max-w-[300px]" : "max-w-[60px]") +
        " w-[300px] bg-secondary dark:bg-primary-dark flex flex-col flex-wrap side-menu items-center transition-[max-width] duration-300 over"
      }
    >
      <div className="relative w-full ">
        <NavLink
          to="/"
          exact
          className="dont-change-on-active flex items-center h-[70px] border-b-[1px] border-b-border dark:border-b-border-dark px-[10px] gap-3"
        >
          <div className="w-[40px] grid justify-center items-center">
            <img
              src={"/logo.svg"}
              alt="Shirin Calories Logo"
              className="min-w-[40px]"
            />
          </div>
          <h1
            className={
              (wideMenu ? "max-w-[100%]" : "max-w-0") +
              " text-text dark:text-text-dark w-[200px] overflow-hidden transition-[max-width] delay-200 duration-300"
            }
          >
            Calc
          </h1>
        </NavLink>

        <button
          onClick={() => {
            setWideMenu(!wideMenu);
          }}
          className="z-30 absolute bg-background-dark text-text-dark w-[25px] h-[25px] right-0 bottom-0 translate-y-1/2 translate-x-1/2 rounded-full text-center grid items-center justify-center"
        >
          <SvgIcon
            icon={wideMenu ? "arrowLeft" : "arrowRight"}
            className="w-[10px] h-[10px] fill-text dark:fill-text-dark translate-x-[-2px]"
          />
        </button>
      </div>
      <div className="w-full pt-4">
        <NavLink
          to="/dashboard"
          className="p-[10px] text-center w-full flex gap-3 h-[4rem] rounded-md hover:bg-hover dark:hover:bg-hover-dark transition-colors text-text dark:text-text-dark align-middle overflow-hidden items-center"
        >
          <SvgIcon
            icon="dashboardIcon"
            className="fill-text dark:fill-icon-color-dark min-w-[40px]"
          />
          <span
            className={
              (wideMenu ? "opacity-100 " : "opacity-0 ") +
              "text-text dark:text-icon-color-dark font-light overflow-hidden text-left transition-opacity duration-300 delay-300 whitespace-nowrap"
            }
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/list-ingreds"
          className="p-[10px] text-center w-full flex gap-3 h-[4rem] rounded-md hover:bg-hover dark:hover:bg-hover-dark transition-colors text-text dark:text-text-dark align-middle overflow-hidden items-center"
        >
          <SvgIcon
            icon="addMealIcon"
            className="fill-text dark:fill-icon-color-dark min-w-[40px]"
          />
          <span
            className={
              (wideMenu ? "opacity-100 " : "opacity-0 ") +
              "text-text dark:text-icon-color-dark font-light overflow-hidden text-left transition-opacity duration-300 delay-300 whitespace-nowrap"
            }
          >
            Add Meal
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
