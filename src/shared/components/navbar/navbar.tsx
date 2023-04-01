import React from "react";
import UserMenu from "./component/user-menu";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="mx-4 flex h-[70px] border-b-solid border-b-[1px] text-text dark:text-text-dark border-b-border dark:border-b-border-dark font-sans font-light items-center">
      <div className="">
        <p className="text-xl">Shirin Calories</p>
      </div>
      <UserMenu />
    </nav>
  );
};

export default Navbar;
