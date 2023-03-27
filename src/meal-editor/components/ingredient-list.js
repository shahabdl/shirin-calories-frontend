import React, { useContext, useState, useEffect } from "react";
import { ingredientContext } from "../../context/meal-context";
import SvgIcon from "../../shared/components/ui/icons";
import AddIngredientCard from "./add-ingredient-card";
import IngredientItem from "./ingredient-item";
import "./ingredient-list.css";
import { fetchAuth } from "../../user/utils/fetch-auth";
import SaveButtons from "./save-buttons";
import { ConvertWithUnit } from "../utils/calculate-nutritions";

const IngredientList = (props) => {
  const { state, dispatch } = useContext(ingredientContext);
  const [listChanged, setListChanged] = useState(false); // check if any changes happened in list to enable or disable save button
  const [isSaving, setIsSaving] = useState(false); // if its in saving buttons should change to loading icon
  const [listIsEmpty, setListIsEmpty] = useState(true); // if list is empty, save as button should be disabled



  const saveHandler = (option) => {
    setIsSaving(true);
    //if we are in root of meal editor tree then we have to push empty state to state stack. then user should Enter name and weight of food to save it
    if (!state.back) {
      dispatch({ type: "pushState", payload: { emptyPush: true, uniqueFoodID: "" } })
      setIsSaving(false);
      return;
    }
    //creating initial request object
    if (state.foodProperties.name === "") {
      setIsSaving(false);
      return;
    }

    let listObject;
    let foodWeight = ConvertWithUnit(state.foodProperties.foodUnit, state.foodProperties.foodWeight);

    listObject = {
      name: state.foodProperties.foodName,
      ingredients: [],
      foods: [],
      totalWeight: foodWeight,
    };

    //loop through foods to add them to request
    for (let ingredientKey in state.ingredientList) {
      let weight = state.ingredientList[ingredientKey].weight;
      let type = state.ingredientList[ingredientKey].types;
      let unit = state.ingredientList[ingredientKey].unit;

      //check to see if food is from users or app database
      if (type === "User Food") {
        let food = {
          foodObj: ingredientKey,
          foodWeight: weight,
          foodUnit: unit,
          foodType: type
        };
        listObject["foods"].push(food);
      } else {
        let ingredient = {
          ingredientObj: ingredientKey,
          ingredientWeight: state.ingredientList[ingredientKey].weight,
          ingredientType: state.ingredientList[ingredientKey].types,
          ingredientUnit: state.ingredientList[ingredientKey].unit,
        };
        listObject["ingredients"].push(ingredient);
      }
    }

    //check to see if this is for creating new food or updating existing one
    let fetchUrl;
    if (!option.saveAs) {
      listObject.foodID = state.foodProperties.uniqueFoodID;
      fetchUrl = "update";
    } else {
      fetchUrl = "save";
    }

    let listJson = JSON.stringify(listObject);

    //fetching '/api/foods/create' to create new food or '/api/foods/update' to update exisiting one
    fetchAuth({
      method: "put",
      url: "/api/foods/" + fetchUrl,
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
        if (res.error && res.error === "Cannot update food") {
          saveHandler({ saveAs: true });
          return;
        }
        if (state.foodProperties.foodImageChanged) {
          props.uploadFoodImage(res.foodID, state.foodProperties.foodName);
        }
        dispatch({ type: "setUniqueFoodID", payload: res.foodID });
        setListChanged(false);
      });
  };

  //chage save button to disabled if list is empty
  //on any change enable save button
  //also check if list needs refetch to fetch new data and remove old cards
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

    //here we check for new data
    if (state.refetch.needReFetch) {
      fetchAuth({
        method: "get",
        url: `/api/foods/${state.refetch.reFetchNewID}`,
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: "updateItemData", payload: res });
        });
    }
  }, [state]);

  const saveToListHandler = () => {
    console.log("save to list");
  };

  //fetching for detailes of a specific food to create new state from it, also changing meal editor name and total weight
  const fetchFoodIngredients = (foodID) => {
    fetchAuth({
      method: "get",
      url: `/api/foods/${foodID}/details`,
    })
      .then((res) => {
        if (!res.ok) {
          return;
        }
        return res.json();
      })
      .then((jsonRes) => {
        for (let ingredient of jsonRes.food.ingredients) {
          fetchAuth({
            method: "get",
            url: `api/ingredients/?id=${ingredient.ingredientObj}`,
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              let itemToDispatch = {
                item: res.ingredient,
                type: ingredient.ingredientType,
                unit: ingredient.ingredientUnit,
                weight: ingredient.ingredientWeight,
              };
              dispatch({
                type: "addIngredient",
                payload: { ...itemToDispatch },
              });
            });
        }
        for (let food of jsonRes.food.foods) {
          fetchAuth({
            method: "get",
            url: `api/foods/${food.foodObj}`,
          })
            .then((res) => res.json())
            .then((res) => {
              let foodToDispatch = {
                item: res.food,
                type: food.foodType,
                unit: food.foodUnit,
                weight: food.foodWeight,
              };
              dispatch({
                type: "addIngredient",
                payload: { ...foodToDispatch },
              });
            });
        }
        dispatch({ type: "changeFoodProperties", payload: { foodName: jsonRes.food.name, foodWeight: jsonRes.food.totalWeight } })
      });
  };

  //pop state to go back 1 level higher in meal editor tree
  const goBack = () => {
    dispatch({ type: "popState", payload: "" });
  }

  return (
    <div className="z-10 w-[100%] h-[100%] overflow-y-auto overflow-x-hidden relative">
      <div className="grid h-max gap-2 ingredient-list-container p-[10px]">
        {state.ingredientList
          ? Object.keys(state.ingredientList).map((item, i) => {
            return (
              <IngredientItem
                item={state.ingredientList[item]}
                key={item}
                isLastItem={
                  i !== 0
                    ? i === Object.keys(state.ingredientList).length - 1
                      ? true
                      : false
                    : false
                }
                id={item}
                fetchFood={fetchFoodIngredients}
              />
            );
          })
          : ""}
        <AddIngredientCard
          changeSearchVisibility={props.changeSearchVisibility}
        />
      </div>
      <SaveButtons
        //we should disable save button when we are in root of editor tree (state.back is false)
        saveButton={listChanged && state.back}
        saveAsButton={listIsEmpty}
        isSaving={isSaving}
        onSave={saveHandler}
        onSaveToList={saveToListHandler}
      />
      {state.back ? (
        <button
          onClick={goBack}
          className="grid justify-center items-center w-[60px] h-[60px] absolute left-[15px] bottom-[15px] dark:bg-primary-dark border-border dark:border-border-dark border-[1px] dark:hover:bg-hover-dark hover:bg-text-dark overflow-hidden fill-text dark:fill-text-dark rounded-xl transition-colors"
        >
          <SvgIcon
            icon="backIcon"
            className="w-[40px] h-[40px] stroke-text-dark stroke-[0.3px]"
          />
        </button>
      ) : (
        ""
      )}

    </div>
  );
};

export default IngredientList;
