import { IngredientType } from "../../shared/types/food-item-type";

const CalculateNutritions = (ingredient: IngredientType) => {
    let weight = ingredient.weight;
    let unit = ingredient.unit;
    let convertedWeight = ConvertWithUnit(unit, weight);
    let item = ingredient.item.types[ingredient.types];

    //recursive function to convert every nutrition in a food with weight and unit of food
    const foodConverter = <T extends Record<string, any> | number>(food: T) => {
        if (typeof food === "number") {
            return roundToDec(convertedWeight * food / 100) as T;
        } else if (typeof food === "object") {
            let newItem: Record<string, any> = {};
            for (let nutrition in food) {
                let obj = food[nutrition]
                let foodConverterResult;
                if (typeof obj === "object") {
                    foodConverterResult = { ...foodConverter<Record<string, any>>(obj) };
                } else if (typeof obj === "number") {
                    foodConverterResult = foodConverter<number>(obj);
                } else {
                    return;
                }
                newItem[nutrition] = foodConverterResult;
            }
            return { ...newItem };
        }
        return;
    }

    return foodConverter(item);
}

const ConvertWithUnit = (unit: string, value: number) => {
    let convertedValue = 0;
    switch (unit) {
        case 'g':
            convertedValue = value;
            break;
        case 'oz':
            convertedValue = value * 28.3495;
            break;
        case 'lb':
            convertedValue = value * 453.592
            break;
        default:
            break;
    }
    return convertedValue;
}

const roundToDec = (num: number, decimal: number = 2) => {
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export { CalculateNutritions, ConvertWithUnit, roundToDec };