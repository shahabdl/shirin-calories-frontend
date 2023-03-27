import { useEffect, useRef, useState } from "react";

const DropdownMenu = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  const clickHandler = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    props.onChange(showMenu);

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };

  }, [showMenu]);

  return (
    <div className={"relative " + props.className} id={props.ID} ref={ref}>
      <button
        className={"hover:text-button dark:hover:text-button-dark flex " + props.buttonClass}
        id={props.ID + "-button"}
        type="button"
        onClick={clickHandler}
      >
        {props.label === "first-child" ?
          <>{props.children[0]}</>
          :
          <>
            {props.label}
          </>
        }
      </button>
      <ul
        className={
          (showMenu ? "" : "hidden") +
          "  bg-primary dark:bg-primary-dark p-3 absolute rounded-lg border-solid border-[1px] border-border dark:border-border-dark w-max " +
          props.listClass
        }
        id={props.ID + "-list"}
      >
        {props.children.map((navlink, index) => {
          if (!(props.label === "first-child" && index === 0)) {
            return (
              <li
                className="first:pt-0"
                key={props.ID + index}
                id={props.ID + "-" + index}
                //onClick={()=>{setShowMenu(!showMenu);}}
              >
                {navlink}
              </li>
            );
          }
          return "";
        })}
      </ul>
    </div>
  );
};

export default DropdownMenu;
