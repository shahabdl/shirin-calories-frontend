import { createContext, ReactNode, useReducer } from "react";
import { CalculateNutritions } from "../meal-editor/utils/calculate-nutritions";
import React from "react";
import { IngredientStateType } from "../shared/types/context-types";
import { IngredientType } from "../shared/types/food-item-type";

interface ActionType {
  type: string,
  payload: any
}

const stateStack: Array<IngredientStateType> = [];

const initialState: IngredientStateType = {
  ingredientList: {},
  nutritionList: {},
  foodProperties: {
    uniqueFoodID: "",
    foodName: "",
    foodWeight: 100,
    foodUnit: "g",
    foodImage: "",
    foodImageChanged: false
  },
  changed: false,
  lisIsEmpty: false,
  back: false,
  refetch: {
    reFetchID: "",
    reFetchNewID: "",
    needReFetch: false,
  }
};

interface ContextType {
  state: IngredientStateType,
  dispatch: React.Dispatch<any>
}

const ingredientContext = createContext<ContextType>({ state: initialState, dispatch: () => null });

const addIngredientHandler = (state: IngredientStateType, action: ActionType) => {
  let tempState = { ...state };
  if (action.payload) {
    let isDuplicate = false;
    for (const ingredient in state.ingredientList) {
      if (action.payload.item._id === state.ingredientList[ingredient].id) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) return state;

    tempState.ingredientList[action.payload.item._id] = {
      id: action.payload.item._id,
      item: { ...action.payload.item },
      types: action.payload.type
        ? action.payload.type
        : Object.keys(action.payload.item.types)[0],
      weight: action.payload.weight ? action.payload.weight : 100,
      unit: action.payload.unit ? action.payload.unit : "g",
    };
  }
  tempState.changed = true;
  return tempState;
};

const removeIngredientHandler = (state: IngredientStateType, action: ActionType) => {
  let tempState = { ...state };
  delete tempState.nutritionList[action.payload];
  delete tempState.ingredientList[action.payload];
  tempState.changed = true;
  return tempState;
};

const ingredientChangeHandler = (state: IngredientStateType, action: ActionType) => {
  let tempState = { ...state };  
  switch (action.payload.type) {
    case "unit":
      tempState.ingredientList[action.payload.id]["unit"] = action.payload.value;
      break;
    case "weight":
      tempState.ingredientList[action.payload.id]["weight"] = action.payload.value;
      break;
    case "types":
      tempState.ingredientList[action.payload.id]["types"] = action.payload.value;
      break;
    default:
      break;
  }
  let nutritions = CalculateNutritions(
    tempState.ingredientList[action.payload.id]
  );
  tempState.nutritionList[action.payload.id] = nutritions;
  tempState.changed = true;

  return tempState;
};

const setUniqueFoodID = (state: IngredientStateType, action: ActionType) => {
  let tempState = { ...state };
  tempState.foodProperties.uniqueFoodID = action.payload;
  return tempState;
};

const setChangedToFalse = (state: IngredientStateType) => {
  const tempState = { ...state };
  tempState.changed = false;
  return tempState;
};

const popState = (state: IngredientStateType) => {
  let tempState = stateStack.pop();
  if (tempState) {
    if (stateStack.length <= 0) {
      tempState.back = false;
    }
    if (state.refetch) {
      tempState.refetch.needReFetch = true;
      tempState.refetch.reFetchID = state.refetch.reFetchID;
      tempState.refetch.reFetchNewID = state.foodProperties.uniqueFoodID;
    }
    return tempState;
  }
  return state;
};

const updateItemData = (state: IngredientStateType, action: ActionType) => {
  let tempState = { ...state };
  tempState.refetch.needReFetch = false;
  delete tempState.nutritionList[state.refetch.reFetchID as string];
  delete tempState.ingredientList[state.refetch.reFetchID as string];

  let newItem = action.payload.food;
  tempState.ingredientList[newItem._id] = {
    id: newItem._id,
    item: { ...newItem },
    types: action.payload.type
      ? action.payload.type
      : Object.keys(newItem.types)[0],
    weight: action.payload.weight ? parseFloat(action.payload.weight) : 100,
    unit: action.payload.unit ? action.payload.unit : "g",
  };
  let nutritions = CalculateNutritions(
    tempState.ingredientList[newItem._id]
  );
  tempState.nutritionList[newItem._id] = nutritions;
  tempState.changed = true;
  return tempState;
};

const pushState = (state: IngredientStateType, action: ActionType): IngredientStateType => {
  let tempState: IngredientStateType;
  if (action.payload.emptyPush) {
    if (!state.back) {
      let emptyState = {
        ingredientList: {},
        nutritionList: {},
        foodProperties: {
          uniqueFoodID: "",
          foodName: "",
          foodWeight: 0,
          foodImage: "",
          foodUnit: "",
          foodImageChanged: false
        },
        changed: false,
        lisIsEmpty: false,
        back: false,
        refetch: {
          reFetchID: "",
          reFetchNewID: "",
          needReFetch: false
        }
      };
      stateStack.push({ ...emptyState })
      tempState = { ...state } as IngredientStateType;
      tempState.foodProperties.uniqueFoodID = action.payload.uniqueFoodID;
      tempState.back = true;
      return tempState;
    } else {
      return state;
    }
  }
  else {
    stateStack.push({ ...state });
    tempState = {
      ingredientList: {},
      nutritionList: {},
      foodProperties: {
        uniqueFoodID: action.payload.uniqueFoodID,
        foodName: action.payload.foodName,
        foodWeight: action.payload.foodWeight,
        foodUnit: action.payload.foodUnit,
        foodImage: "",
        foodImageChanged: false
      },
      changed: false,
      lisIsEmpty: false,
      back: true,
      refetch: {
        reFetchID: action.payload.uniqueFoodID,
        reFetchNewID: "",
        needReFetch: false
      }
    };
    return tempState
  }
};

const changeFoodProperties = (state: IngredientStateType, action: ActionType) => {
  let tempState = { ...state };
  if (action.payload.foodName)
    tempState.foodProperties.foodName = action.payload.foodName;
  if (action.payload.foodWeight)
    tempState.foodProperties.foodWeight = action.payload.foodWeight;
  if (action.payload.foodUnit)
    tempState.foodProperties.foodUnit = action.payload.foodUnit;
  if (action.payload.foodImage)
    tempState.foodProperties.foodImage = action.payload.foodImage;
  if (action.payload.foodImageChanged !== undefined) {
    tempState.foodProperties.foodImageChanged = action.payload.foodImageChanged;
  }
  return tempState;
}

const rootReducer = (state: IngredientStateType, action: ActionType): IngredientStateType => {
  switch (action.type) {
    case "addIngredient":
      return addIngredientHandler(state, action);
    case "removeIngredient":
      return removeIngredientHandler(state, action);
    case "changeIngredient":
      return ingredientChangeHandler(state, action);
    case "setUniqueFoodID":
      return setUniqueFoodID(state, action);
    case "setChangedToFalse":
      return setChangedToFalse(state);
    case "pushState":
      return pushState(state, action);
    case "popState":
      return popState(state);
    case "updateItemData":
      return updateItemData(state, action);
    case "changeFoodProperties":
      return changeFoodProperties(state, action);
    default:
      return state;
  }
};
interface PropsType {
  children: ReactNode,
  testValue: any
}
const IngredientProvider = ({ children, testValue }: PropsType) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  // console.log('stack', stateStack);
  // console.log('state', state);
  return (
    <ingredientContext.Provider value={testValue ? { ...testValue } : { state, dispatch }}>
      {children}
    </ingredientContext.Provider>
  );
};

export { ingredientContext, IngredientProvider };