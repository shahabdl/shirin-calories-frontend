import React, { useContext, useEffect, useState } from "react";
import { ingredientContext } from "../../context/ingredient-context";
import SvgIcon from "../../shared/components/ui/icons";
import { fetchAuth } from "../../user/utils/fetch-auth";

const IngredientListBar = () => {
  const { state, dispatch } = useContext(ingredientContext);
  const [listChanged, setListChanged] = useState(false); // check if any changes happened in list to enable or disable save button
  const [isSaving, setIsSaving] = useState(false); // if its in saving buttons should change to loading icon
  const [listIsEmpty, setListIsEmpty] = useState(true); // if list is empty, save as button should be disabled

  const resetIngredientList = () => {
    let i = Object.keys(state.ingredientList).length - 1;
    if (i >= 0) {
      //running this function by itself in a setTimeout function makes it run every n ms
      //this makes sure remove animation ends before removing object
      (function deleteByAnimation(i) {
        let itemId = Object.keys(state.ingredientList)[i];
        let item = document.getElementById(itemId);
        item.classList.add("animate-rtl-fade");
        setTimeout(() => {
          dispatch({ type: "removeIngredient", payload: itemId });
          if (i--) {
            deleteByAnimation(i);
          }
        }, 400);
      })(i);
    }
    //when user resets list, we should remove unique food id,
    //so if user saves list again it save it as a new document
    dispatch({ type: "setUniqueFoodID", payload: "" });
  };

  const saveHandler = (option) => {
    setIsSaving(true);

    let listObject;

    listObject = {
      name: "test",
      ingredients: [],
      foods: [],
    };

    for (let ingredientKey in state.ingredientList) {
      let ingredient = {
        ingredientObj: ingredientKey,
        ingredientWeight: state.ingredientList[ingredientKey].weight,
        ingredientType: state.ingredientList[ingredientKey].types,
      };
      listObject["ingredients"].push(ingredient);
    }
    if (!option.saveAs) {
      listObject.foodID = state.uniqueFoodID;
    }

    let listJson = JSON.stringify(listObject);

    fetchAuth({
      method: "put",
      url: "/api/foods/create",
      body: listJson,
    })
      .then((res) => {
        if (!res.ok) {
          console.log("couldn't save food!");
          return;
        }
        return res.json();
      })
      .then((res) => {
        setIsSaving(false);
        dispatch({ type: "setUniqueFoodID", payload: res.foodID });
      });
    setListChanged(false);
  };

  //chage save button to disabled if list is empty
  //on any change enable save button
  useEffect(() => {
    if (state.changed) {
      if (Object.keys(state.ingredientList).length > 0) {
        setListChanged(true);
      } else {
        setListChanged(false);
      }
      dispatch({ type: "setChangedToFalse", payload: "" });
    }
    if (Object.keys(state.ingredientList).length > 0) {
      setListIsEmpty(false);
    } else {
      setListIsEmpty(true);
    }
  }, [state]);

  return (
    <div className="h-[36px] bg-primary dark:bg-primary-dark flex border-b-[1px] border-b-border dark:border-b-border-dark">
      {/*save button*/}
      <button
        onClick={() => saveHandler({ saveAs: false })}
        disabled={!listChanged}
        className="border-r-border transition-colors dark:border-r-border-dark border-r-[1px] px-5 fill-text dark:fill-text-dark hover:bg-button hover:fill-hover dark:hover:bg-hover-dark disabled:fill-light-gray dark:disabled:fill-border-dark"
      >
        <SvgIcon icon={isSaving ? "loadingIcon" : "saveIcon"} />
      </button>
      <button
        onClick={() => saveHandler({ saveAs: true })}
        disabled={listIsEmpty}
        className="border-r-border transition-colors dark:border-r-border-dark border-r-[1px] px-5 fill-text dark:fill-text-dark hover:bg-button hover:fill-hover dark:hover:bg-hover-dark disabled:fill-light-gray dark:disabled:fill-border-dark"
      >
        <SvgIcon icon={isSaving ? "loadingIcon" : "saveAsIcon"} />
      </button>
      {/*reset button*/}
      <button
        onClick={resetIngredientList}
        className="border-l-border transition-colors dark:border-l-border-dark border-l-[1px] ml-auto px-5 fill-text dark:fill-text-dark hover:bg-button hover:fill-hover dark:hover:bg-hover-dark"
      >
        <SvgIcon icon="resetIcon" />
      </button>
    </div>
  );
};

export default IngredientListBar;
