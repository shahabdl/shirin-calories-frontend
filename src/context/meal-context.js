import { createContext, useReducer } from "react";
import { CalculateNutritions } from "../meal-editor/utils/calculate-nutritions";

const stateStack = [];

const initialState = {
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

const ingredientContext = createContext();

const addIngredientHandler = (state, action) => {
  let tempState = { ...state };
  if (action.payload) {
    let isDuplicate = false;
    for (const ingredient in state.ingredientList) {
      if (action.payload.item._id === ingredient.id) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) return state;

    tempState.ingredientList[action.payload.item._id] = {
      item: { ...action.payload.item },
      types: action.payload.type
        ? action.payload.type
        : Object.keys(action.payload.item.types)[0],
      weight: action.payload.weight ? parseFloat(action.payload.weight) : 100,
      unit: action.payload.unit ? action.payload.unit : "g",
    };
  }
  tempState.changed = true;
  return tempState;
};

const removeIngredientHandler = (state, action) => {
  let tempState = { ...state };
  delete tempState.nutritionList[action.payload];
  delete tempState.ingredientList[action.payload];
  tempState.changed = true;
  return tempState;
};

const ingredientChangeHandler = (state, action) => {
  let tempState = { ...state };
  tempState.ingredientList[action.payload.id][action.payload.type] =
    action.payload.value;

  let nutritions = CalculateNutritions(
    tempState.ingredientList[action.payload.id]
  );
  tempState.nutritionList[action.payload.id] = nutritions;
  tempState.changed = true;

  return tempState;
};

const setUniqueFoodID = (state, payload) => {
  let tempState = { ...state };
  tempState.foodProperties.uniqueFoodID = payload;
  return tempState;
};

const setChangedToFalse = (state) => {
  const tempState = { ...state };
  tempState.changed = false;
  return tempState;
};

const popState = (state) => {
  let tempState = stateStack.pop();
  if (stateStack.length <= 0) {
    tempState.back = false;
  }
  if (state.refetch) {
    tempState.refetch.needReFetch = true;
    tempState.refetch.reFetchID = state.refetch.reFetchID;
    tempState.refetch.reFetchNewID = state.foodProperties.uniqueFoodID;
  }
  return tempState;
};

const updateItemData = (state, payload) => {
  let tempState = { ...state };
  tempState.refetch.needReFetch = false;
  delete tempState.nutritionList[state.refetch.reFetchID];
  delete tempState.ingredientList[state.refetch.reFetchID];

  let newItem = payload.food;
  tempState.ingredientList[newItem._id] = {
    item: { ...newItem },
    types: payload.type
      ? payload.type
      : Object.keys(newItem.types)[0],
    weight: payload.weight ? parseFloat(payload.weight) : 100,
    unit: payload.unit ? payload.unit : "g",
  };
  let nutritions = CalculateNutritions(
    tempState.ingredientList[newItem._id]
  );
  tempState.nutritionList[newItem._id] = nutritions;
  tempState.changed = true;
  return tempState;
};

const pushState = (state, payload) => {
  let tempState;
  if (payload.emptyPush) {
    if (!state.back) {
      let emptyState = {
        ingredientList: {},
        nutritionList: {},
        foodProperties: {
          uniqueFoodID: "",
          foodName: "",
          foodWeight: "",
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
      tempState = { ...state };
      tempState.uniqueFoodID = payload.uniqueFoodID;
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
        uniqueFoodID: payload.uniqueFoodID,
        foodName: "",
      },
      changed: false,
      lisIsEmpty: false,
      back: true,
      refetch: {
        reFetchID: payload.uniqueFoodID,
        reFetchNewID: "",
        needReFetch: false
      }
    };
  }
  return tempState;
};

const changeFoodProperties = (state, payload) => {
  let tempState = { ...state };
  if (payload.foodName)
    tempState.foodProperties.foodName = payload.foodName;
  if (payload.foodWeight)
    tempState.foodProperties.foodWeight = payload.foodWeight;
  if (payload.foodUnit)
    tempState.foodProperties.foodUnit = payload.foodUnit;
  if (payload.foodImage)
    tempState.foodProperties.foodImage = payload.foodImage;
  if (payload.foodImageChanged !== undefined) {
    tempState.foodProperties.foodImageChanged = payload.foodImageChanged;
  }
  return tempState;
}

const rootReducer = (state, action) => {
  switch (action.type) {
    case "addIngredient":
      return addIngredientHandler(state, action);
    case "removeIngredient":
      return removeIngredientHandler(state, action);
    case "changeIngredient":
      return ingredientChangeHandler(state, action);
    case "setUniqueFoodID":
      return setUniqueFoodID(state, action.payload);
    case "setChangedToFalse":
      return setChangedToFalse(state);
    case "pushState":
      return pushState(state, action.payload);
    case "popState":
      return popState(state);
    case "updateItemData":
      return updateItemData(state, action.payload);
    case "changeFoodProperties":
      return changeFoodProperties(state, action.payload);
    default:
      return state;
  }
};
const IngredientProvider = ({ children, testValue }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  // console.log('stack',stateStack);
  // console.log('state',state);
  return (
    <ingredientContext.Provider value={testValue ? {...testValue} : { state, dispatch }}>
      {children}
    </ingredientContext.Provider>
  );
};

export { ingredientContext, IngredientProvider };