import React from "react";
import { itemType } from "../../shared/types/food-item-type";

interface PropsType {
  clickHandler: (item: itemType) => void,
  ingredParams: itemType
}

const SearchItem = (props: PropsType) => {
  const clickHandler = () => {
    props.clickHandler(props.ingredParams);
  };

  return (
    <div
      data-testid="search-item"
      className="flex cursor-pointer gap-[10px] font-thin items-center hover:bg-gray-100 py-[10px] border-b-border dark:border-b-border-dark border-b-solid border-b-[1px] last-of-type:border-none"
      onClick={clickHandler}
    >
      <img
        src={`http://localhost:5000/food-images/${props.ingredParams.foodImage}`}
        className="w-[40px] h-[40px] object-cover rounded-lg"
        alt={props.ingredParams.name}
      />
      <p>{props.ingredParams.name}</p>
    </div>
  );
};

export default SearchItem;
