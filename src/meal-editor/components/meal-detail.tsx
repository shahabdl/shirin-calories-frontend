import ImageUpload from "../../shared/components/ui/image-upload"
import DropdownList from "../../shared/components/ui/dropdown-list"
import InputNumber from "../../shared/components/ui/input-number";
import { useContext } from "react";
import React from "react";
import { ingredientContext } from "../../context/meal-context";

interface PropsType {
    onImageChange: (image: string) => null
}

const MealDetailes = ({ onImageChange }: PropsType) => {
    const { state, dispatch } = useContext(ingredientContext)
    const changeWeight = (weight: number) => {
        dispatch({ type: "changeFoodProperties", payload: { foodWeight: weight } })
    }
    const changeUnit = (unit: string) => {
        dispatch({ type: "changeFoodProperties", payload: { foodUnit: unit } })
    }

    const changeName = (name: string) => {
        dispatch({ type: "changeFoodProperties", payload: { foodName: name } })
    }

    const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className="px-3 mt-2 pb-5 mb-2 border-b-[1px] border-border dark:border-border-dark" onSubmit={submitHandler}>
            <h2 className="text-lg font-light pb-2">Food Properties</h2>
            <ImageUpload onImageChange={(image:string) => { onImageChange(image) }}  />
            <input
                onChange={(e) => changeName(e.target.value)}
                className="w-full rounded-lg h-[34px] dark:bg-primary-dark bg-primary dark:border-border-dark border-border border-[1px] focus-visible:outline-none dark:focus-visible:bg-background-dark focus-visible:bg-background px-2 font-light mb-2 transition-colors"
                placeholder="Food Name..."
                value={state.foodProperties.foodName}
            ></input>
            <div className="grid grid-cols-2 gap-2">
                <InputNumber
                    onChange={changeWeight}
                    defaultValue={state.foodProperties.foodWeight ? state.foodProperties.foodWeight : 100}
                />
                <DropdownList
                    defaultValue={state.foodProperties.foodUnit ? state.foodProperties.foodUnit : "g"}
                    onSelect={changeUnit}
                    options={["g", "oz", "lb"]}
                />
            </div>
        </form>
    )
}

export default MealDetailes;