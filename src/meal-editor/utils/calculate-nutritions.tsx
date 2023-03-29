interface itemType {
    types: {
        [key: string]:
        {
            calories: number,
            macros: {
                [key: string]: {
                    carbs: {
                        [key: string]: {
                            total: number,
                            fiber: number,
                            sugar: number
                        }
                    },
                    fats: {
                        [key: string]: {
                            total: number,
                            saturated: number,
                            cholesterol: number
                        }
                    },
                    proteins: number
                }
            },
            micros: {
                [key: string]: {
                    iron: number,
                    calcium: number,
                    potassium: number,
                    sodium: number,
                    omega3: number
                }
            }
            vitamins: {
                [key: string]:
                {
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
        }
    }
}

interface IngredientType {
    weight: number,
    unit: string,
    types: string,
    item: itemType
}

const CalculateNutritions = (ingredient: IngredientType) => {

    let weight = ingredient.weight;
    let unit = ingredient.unit;
    let convertedWeight = ConvertWithUnit(unit, weight);
    let item = ingredient.item.types[ingredient.types];


    //recursive function to convert every nutrition in a food with weight and unit of food
    const foodConverter = (food: { [key: string]: object | number }) => {
        let newItem = {} as { [key: string]: object | number };
        for (let nutrition in food) {
            if (typeof food[nutrition] === "number") {
                let num = food[nutrition] as number;
                newItem[nutrition] = roundToDec(convertedWeight * num / 100);
            } else if (typeof food[nutrition] === "object") {
                let obj = food[nutrition] as { [key: string]: object | number }
                newItem[nutrition] = { ...foodConverter(obj) };
            }
        }
        return newItem;
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