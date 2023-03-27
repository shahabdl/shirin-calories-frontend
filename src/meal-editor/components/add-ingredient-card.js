import React from "react";
import SvgIcon from "../../shared/components/ui/icons";



const AddIngredientCard = (props) => {

    const addItemHandler = ()=>{
        props.changeSearchVisibility(true)
    }

  return (
    <div
        onClick={addItemHandler}
        className="cursor-pointer grid justify-center items-center shadow-md dark:shadow-none bg-primary dark:bg-primary-dark w-full h-[340px] rounded-lg text-sm"
    >
      <div className="border-border dark:border-border-dark border-[1px] rounded-xl p-5">
        <SvgIcon
          icon="plusIcon"
          className="fill-secondary dark:fill-border-dark"
        />
      </div>
    </div>
  );
};

export default AddIngredientCard;
