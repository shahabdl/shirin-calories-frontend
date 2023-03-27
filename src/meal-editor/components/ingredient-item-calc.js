import React, { useContext } from "react";
import { ingredientContext } from "../../context/ingredient-context";
import LoadingSpinner from "../../shared/components/ui/loading-spinner";
import ResultTxtIcon from "../../shared/components/ui/result-text-icon";


const IngredItemCalc = (props)=>{
    const {state} = useContext(ingredientContext);

    return(
        <div className={"font-light text-sm  max-w-[100%] overflow-hidden z-40 grid gap-1 " + props.className}>
            {typeof(state.nutritionList[props.id])!== "undefined"?
            <>
                <ResultTxtIcon
                    icon="calories"
                    dark={true}
                    delimiter=":"
                    text="Calories"
                    value={state.nutritionList[props.id].calories}
                />
                <ResultTxtIcon
                    icon="proteins"
                    dark={true}
                    delimiter=":"
                    text="Proteins"
                    value={state.nutritionList[props.id].proteins}
                />
                <ResultTxtIcon
                    icon="fats"
                    dark={true}
                    delimiter=":"
                    text="Fat"
                    value={state.nutritionList[props.id].fats}
                />
                <ResultTxtIcon
                    icon="carbs"
                    dark={true}
                    delimiter=":"
                    text="Carbs"
                    value={state.nutritionList[props.id].carbs}
                />
            </>
            :
            <LoadingSpinner />
            }
        </div>
    )
}

export default IngredItemCalc;