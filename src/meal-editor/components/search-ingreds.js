import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { fetchAuth } from "../../user/utils/fetch-auth";
import SearchItem from "./search-item";
import { ingredientContext } from "../../context/meal-context";
import "./search-ingreds.css";
import SvgIcon from "../../shared/components/ui/icons";

const SearchIngred = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundResults, setFoundResults] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [userFoodsResult, setUserFoodsResult] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchedYet, setSearchedYet] = useState(false);

  const ref = useRef();

  const { dispatch } = useContext(ingredientContext);

  const closeSearchBox = () => {
    props.changeSearchVisibility(false);
  };

  let filterTimeout;
  const changeHandler = (e) => {
    clearTimeout(filterTimeout);
    if (!e.target.value) {
      setSearchResult([]);
      setUserFoodsResult([]);
      setSearchQuery("");
      setFoundResults(false);
      return;
    }
    filterTimeout = setTimeout(() => {
      if (e.target.value !== searchQuery) {
        setSearchQuery(e.target.value);
      }
    }, 500);
  };

  const addItemHandler = (item) => {
    dispatch({ type: "addIngredient", payload: { item } });
    props.changeSearchVisibility(false);
  };

  const createPlaceHolder = useCallback(() => {
    const placeHolder = [];
    for (let i = 0; i < 5; i++) {
      placeHolder.push(
        <div
          className="w-full h-[58px] border-b-[1px] border-border dark:border-border-dark flex items-center"
          key={i}
        >
          <svg className="w-full h-full fill-[#181c20]">
            <rect
              x="10px"
              width="40px"
              height="40px"
              ry="10px"
              rx="10px"
              className="translate-y-[calc(50%-20px)]"
            />
            <rect className="translate-x-[60px] translate-y-[calc(50%-5px)] w-[calc(100%-60px)] h-[10px]" />
            <rect
              width="100px"
              height="100%"
              className="ingredient-place-holder"
            />
            <defs>
              <clipPath id="ingredient-ph">
                <rect
                  x="10px"
                  width="40px"
                  height="40px"
                  ry="10px"
                  rx="10px"
                  className="translate-y-[calc(50%-20px)]"
                />
                <rect
                  x="60px"
                  height="10px"
                  className="translate-y-[calc(50%-5px)] w-[calc(100%-60px)]"
                />
              </clipPath>
              <linearGradient id="ph-gradient">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    return placeHolder;
  }, []);

  //fetch data when searchbox changed
  useEffect(() => {
    const searchQueryChanged = () => {
      setSearchResult([]);
      setUserFoodsResult([]);
      if (searchQuery !== "") {
        setSearchedYet(true);
        setLoadingData(true);
        fetchAuth({
          method: "get",
          url: "/api/ingredients/?name=" + searchQuery,
          options: { redirect: window.location.pathname },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((foods) => {
            if (foods) {
              if (foods["ingredients"].length > 0 || foods["usersFoods"].length > 0) {
                setSearchResult([...foods["ingredients"]]);
                setUserFoodsResult([...foods["usersFoods"]]);
                setFoundResults(true);
              } else {
                setFoundResults(false);
              }
            } else {
              setSearchResult([]);
              setUserFoodsResult([]);
              setFoundResults(false);
            }
            setLoadingData(false);
          })
          .catch((err) => {
            if (err.error === "Auth_Error") {
              window.location.replace(`/user/login?redirectTo=${window.location.pathname}`);
            }
            setFoundResults(false);
            setLoadingData(false);
          });
      }
    };
    searchQueryChanged();
  }, [searchQuery]);

  //check to see if user clicked outside of search window to close it
  useEffect(() => {
    let searchBox = document.getElementById("searchBox");
    if (searchBox) {
      searchBox.focus();
      searchBox.value = "";
    }

    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        props.changeSearchVisibility(false);
      }
      if (ref.current === e.target) {
        props.changeSearchVisibility(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [props]);

  return (
    <div
      ref={ref}
      className="z-20 font-sans font-light absolute top-0 left-0 w-full h-full bg-background dark:bg-background-dark z-90"
    >
      {/* search bar */}
      <div className="relative h-[36px] px-[10px] mt-[10px]">
        <div className="relative rounded-2xl overflow-hidden border-solid border-[1px] border-border dark:border-border-dark ">
          <input
            role="search"
            type="text"
            className=" w-full h-[36px] p-1 focus-visible:bg-slate-100 focus-visible:outline-none pl-[30px] placeholder-light-gray bg-primary dark:bg-primary-dark"
            id="searchBox"
            placeholder="Add Ingredients"
            onChange={changeHandler}
          />
          <button
            onClick={closeSearchBox}
            className="absolute right-0 top-0 h-[100%] w-[60px] border-l-[1px] border-l-border dark:border-l-border-dark dark:hover:bg-hover-dark hover:bg-hover transition-colors grid justify-center items-center"
          >
            <SvgIcon
              icon="closeIcon"
              className="fill-text dark:fill-text-dark"
              width="20"
              height="20"
            />
          </button>
          <div className="w-[20px] h-[20px] absolute top-[50%] translate-y-[-45%] left-[7px] fill-text dark:fill-text-dark">
            <SvgIcon icon="searchIcon" width="20" height="20" />
          </div>
        </div>
      </div>
      {/* Search Results */}
      <div className="grid grid-cols-2 overflow-y-auto max-h-[calc(100vh-96px)] pt-5">
        {foundResults || loadingData ? (
          <>
            <div className="z-10 w-[100%] px-3">
              <h2 className="font-light mb-3 text-text dark:text-text-dark">
                App Foods
              </h2>
              {loadingData ? <>{createPlaceHolder()}</> : ""}
              {searchResult.map((res, i) => {
                return (
                  <SearchItem
                    ingredParams={res}
                    key={res["_id"]}
                    clickHandler={addItemHandler}
                  />
                );
              })}
            </div>
            <div className="z-10 w-[100%] border-l-[1px] border-l-border dark:border-l-border-dark px-3">
              <h2 className="font-light mb-3 text-text dark:text-text-dark">
                Users Foods
              </h2>
              {loadingData ? <>{createPlaceHolder()}</> : ""}
              {userFoodsResult.map((res, i) => {
                return (
                  <SearchItem
                    ingredParams={res}
                    key={res["_id"]}
                    clickHandler={addItemHandler}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-xl">
            {!searchedYet ?
              "Enter Food Name in Search Box"
              :
              "Search Found No Results!"
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchIngred;
