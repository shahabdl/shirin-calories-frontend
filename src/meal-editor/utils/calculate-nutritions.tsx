import { IngredientType } from "../../shared/types/food-item-type";

const CalculateNutritions = (ingredient: IngredientType) => {
    let weight = ingredient.weight;
    let unit = ingredient.unit;
    let convertedWeight = ConvertWithUnit(unit, weight);
    let item = ingredient.item.types[ingredient.types];

    //recursive function to convert every nutrition in a food with weight and unit of food
    const foodConverter = (food: Record<string, any> | number) => {
        let newItem: Record<string, any> = {};

        if (typeof food === "number") {
            newItem = { num: roundToDec(convertedWeight * food / 100) };
        } else if (typeof food === "object") {
            for (let nutrition in food) {
                let obj = food[nutrition]
                let foodConverterResult = {...foodConverter(obj)};
                if('num' in foodConverterResult){
                    newItem[nutrition] = foodConverterResult.num;
                }else{
                    newItem[nutrition] = {...foodConverterResult};
                }
            }
        }
        return { ...newItem };
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

const roundToDec = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export { CalculateNutritions, ConvertWithUnit };