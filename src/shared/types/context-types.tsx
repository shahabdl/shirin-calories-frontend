import { IngredientType } from "./food-item-type"

export interface UserStateType {
    userName: string | null,
    userID: string | null
    userEmail: string | null,
    userAccessToken: string | null,
    userAvatar: {
        image: string | null,
        type: string | null
    },
    userSettings: {
        darkMode: string | null
    },
  }

  export interface IngredientStateType {
    ingredientList: {
      [key: string]: IngredientType
    },
    nutritionList: {
      [key: string]: any
    },
    foodProperties: {
      uniqueFoodID: string,
      foodName: string,
      foodWeight: number,
      foodUnit: string,
      foodImage: string,
      foodImageChanged: boolean
    },
    changed: boolean,
    lisIsEmpty: boolean,
    back: boolean,
    refetch: {
      reFetchID: string,
      reFetchNewID: string,
      needReFetch: boolean
    }
  }