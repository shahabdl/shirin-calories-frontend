export interface IngredientType {
    [key: string]: string | number | itemType,
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
    [key: string] : any,
    calories: number,
    macros: {
        carbs: {
            total: number,
            fiber: number,
            sugar: number
        },
        fats: {
            total: number,
            saturated: number,
            cholesterol: number
        },
        proteins: number
    },
    micros: {
        iron: number,
        calcium: number,
        potassium: number,
        sodium: number,
        omega3: number
    }
    vitamins: {
        a: number,
        c: number,
        b6: number,
        b1: number,
        b12: number,
        b2: number,
        b3: number,
        b5: number,
        d: number,
        e: number,
        k: number
    }
}