import React, { useContext, useState } from "react";
import SearchIngred from "../components/search-ingreds";
import IngredientList from "../components/ingredient-list";
import ListResults from "../components/list-results";
import MealDetailes from "../components/meal-detail";
import { ingredientContext } from "../../context/meal-context";
import { fetchAuth } from "../../user/utils/fetch-auth";


const MealEditor = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { state, dispatch } = useContext(ingredientContext);
  const [foodImage, setFoodImage] = useState("");

  const changeSearchVisibility = (visibility) => {
    setShowSearch(visibility);
  };

  const imageChangeHandler = (image)=>{
    setFoodImage(image);
    dispatch({type:"changeFoodProperties",payload:{foodImageChanged:true}});
  }

  const uploadFoodImage = (foodID, foodName) => {
    const fd = new FormData();
    fd.append('foodName', foodName);
    fd.append('foodID', foodID);
    fd.append('foodImage', foodImage);
    fetchAuth({
      method: "post",
      url: "/api/image/upload",
      options: { json: false },
      body: fd
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        console.log(res);
        dispatch({ type: "changeFoodProperties", payload: { foodImage: res.foodImage.filename, foodImageChanged:false } });
      });
  }

  return (
    <div className="flex items-center justify-center h-[100%]">
      <div className="border-solid border-r-[1px] border-border dark:border-border-dark w-9/12 2xl:w-10/12 h-[100%] overflow-hidden relative">
        {showSearch ? (
          <SearchIngred
            changeSearchVisibility={changeSearchVisibility}
          />
        ) : (
          ""
        )}
        <IngredientList changeSearchVisibility={changeSearchVisibility} uploadFoodImage={uploadFoodImage} />
      </div>
      <div className="w-3/12 2xl:w-2/12 h-[100%] overflow-y-auto px-2">
        {state.back ?
          <MealDetailes onImageChange={imageChangeHandler} />
          :
          ""
        }
        <ListResults />
      </div>
    </div>
  );
};

export default MealEditor;
