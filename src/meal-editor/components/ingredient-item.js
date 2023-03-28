import React, { useContext, useEffect, useState } from "react";
import { ingredientContext } from "../../context/meal-context";
import { userContext } from "../../context/user-context";
import DropdownList from "../../shared/components/ui/dropdown-list";
import InputNumber from "../../shared/components/ui/input-number";
import CircularGraph from "../../shared/components/ui/graph/circular-graph";
import "./ingredient-item.css";

const IngredientItem = (props) => {
  const { state, dispatch } = useContext(ingredientContext);
  const { userState } = useContext(userContext);

  const [removeAnimation, setRemoveAnimation] = useState(false);
  const [editable, setEditable] = useState(false);

  const removeItemHandler = () => {
    setRemoveAnimation(true);
    setTimeout(() => {
      dispatch({ type: "removeIngredient", payload: props.item.item._id });
    }, 500);
  };
  const changeType = (type) => {
    dispatch({
      type: "changeIngredient",
      payload: { id: props.item.item._id, type: "types", value: type },
    });
  };
  const changeWeight = (weight) => {
    dispatch({
      type: "changeIngredient",
      payload: { id: props.item.item._id, type: "weight", value: weight },
    });
  };
  const changeUnit = (unit) => {
    dispatch({
      type: "changeIngredient",
      payload: { id: props.item.item._id, type: "unit", value: unit },
    });
  };

  const editItemHandler = () => {
    dispatch({ type: "pushState", payload: { uniqueFoodID: props.item.item._id, foodName: props.item.item.name } });
    props.fetchFood(props.item.item._id);

  }

  useEffect(() => {
    if (props.item.item.owner && props.item.item.owner === userState.userID) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, []);

  return (
    <div
      className={
        (removeAnimation ? "animate-rtl-fade " : "") +
        "ingredient-card relative  shadow-md dark:shadow-none bg-primary dark:bg-primary-dark  h-[340px] rounded-xl text-sm animate-ltr-fade focus-within:z-10 border-border dark:border-border-dark border-[1px] food-item-card"
      }
      id={props.id}
    >
      <button
        onClick={removeItemHandler}
        className={
          "hover:bg-button dark:hover:bg-button-dark transition-colors dark:hover:fill-hover-dark fill-text dark:fill-text-dark absolute z-[100] right-0 w-[45px] h-[25px] bg-primary dark:bg-primary-dark rounded-tr-md"
        }
      >
        X
      </button>

      <div className="h-[50%] w-[100%] overflow-hidden relative rounded-t-xl">
        <img
          className="object-cover h-[100%] w-[100%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src={`http://localhost:5000/food-images/${props.item.item.foodImage}`}
          alt={props.item.item.name}
        />
        <div className="food-card-result absolute z-20 top-0 left-0 w-full h-full items-center grid">
          <CircularGraph
            id={props.id}
            middleValue={{
              legend: "Calories",
              value: state.nutritionList[props.id] ? Math.round(state.nutritionList[props.id].calories) : 0,
              icon: "calories"
            }}
            data={[
              {
                name: "Fat",
                value: state.nutritionList[props.id] ? state.nutritionList[props.id].macros.fats.total : 0,
                color: "rgb(230,84,6)",
                icon: "fats",
                strokeWidth: "5",
                hoverStrokeWidth: "10"
              },
              {
                name: "Proteins",
                value: state.nutritionList[props.id] ? state.nutritionList[props.id].macros.proteins : 0,
                color: "rgb(255,165,0)",
                icon: "proteins",
                strokeWidth: "5",
                hoverStrokeWidth: "10"
              },
              {
                name: "Carbs",
                value: state.nutritionList[props.id] ? state.nutritionList[props.id].macros.carbs.total : 0,
                color: "rgb(5,125,240)",
                icon: "carbs",
                strokeWidth: "5",
                hoverStrokeWidth: "10"
              }
            ]}
            options={{
              showLegend: true,
              showMiddleValue: true,
              showCenterIcons: false,
              iconSize: 15,
              padding: 10
            }}
          />
        </div>
      </div>

      <div className="px-2">
        <div className="flex py-2 border-b-[1px] border-border dark:border-border-dark">
          <h2 className="float-left font-light text-sm">
            {props.item.item.name}
          </h2>
          {editable ? (
            <>
              <button
                onClick={editItemHandler}
                className="ml-auto text-button dark:text-button-dark border-button dark:border-button-dark border-solid border-[1px] px-2 pb-1 rounded-lg font-light text-xs">edit</button>
            </>
          ) : (
            <div className="ml-auto text-button dark:text-button-dark border-button dark:border-button-dark border-solid border-[1px] px-2 pb-1 rounded-lg font-light text-xs" data-testid="author-indicator">
              {props.item.item.owner ? "user" : "app"}
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 pt-2 gap-1" data-testid="type-dropdown">
          <span>Type:</span>
          <DropdownList
            defaultValue={props.item.types ? props.item.types : 0}
            onSelect={changeType}
            options={[...Object.keys(props.item.item.types)]}
            className="col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 pt-2 gap-1" data-testid="unit-dropdown">
          <span>Unit:</span>
          <DropdownList
            defaultValue={props.item.unit ? props.item.unit : 0}
            onSelect={changeUnit}
            options={["g", "oz", "lb"]}
            className="col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 pt-2 gap-1">
          <span>Amount:</span>
          <InputNumber
            onChange={changeWeight}
            defaultValue={props.item.weight ? props.item.weight : 100}
            className="col-span-2"
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientItem;
