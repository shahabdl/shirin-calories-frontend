export interface IngredientType {
    id: string,
    weight: number,
    unit: string,
    types: string,
    item: itemType
}

export interface itemType {
    _id: string,
    author: string,
    foodImage: string,
    name: string,
    types: { [key: string]: any }
}

export interface NutritionType {
    [key: string]: any,
    calories: number | string,
    macros: {
        carbs: {
            total: number | string,
            fiber: number | string,
            sugar: number | string
        },
        fats: {
            total: number | string,
            saturated: number | string,
            cholesterol: number | string
        },
        proteins: number | string
    },
    micros: {
        iron: number | string,
        calcium: number | string,
        potassium: number | string,
        sodium: number | string,
        omega3: number | string
    }
    vitamins: {
        a: number | string,
        c: number | string,
        b6: number | string,
        b1: number | string,
        b12: number | string,
        b2: number | string,
        b3: number | string,
        b5: number | string,
        d: number | string,
        e: number | string,
        k: number | string
    }
}