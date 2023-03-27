const CalculateNutritions = (ingredient) => {

    let weight = ingredient.weight;
    let unit = ingredient.unit;
    let convertedWeight = ConvertWithUnit(unit, weight);
    let item = ingredient.item.types[ingredient.types];


    //recursive function to convert every nutrition in a food with weight and unit of food
    const foodConverter = (food) => {
        let newItem = {};
        for (let nutrition in food) {
            if (typeof (food[nutrition]) !== "object") {
                newItem[nutrition] = roundToDec(convertedWeight * food[nutrition] / 100);
            } else if (typeof (food[nutrition] === "object")) {
                newItem[nutrition] = { ...foodConverter(food[nutrition]) };
            }
        }
        return newItem;
    }

    return foodConverter(item);
}

const ConvertWithUnit = (unit, value) => {
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

const roundToDec = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export { CalculateNutritions, ConvertWithUnit };