import React, { useCallback, useContext, useEffect, useState } from "react";
import { ingredientContext } from "../../context/meal-context";
import CircularGraph from "../../shared/components/ui/graph/circular-graph";

const ListResults = ({ foodProperties }) => {
  const [result, setResult] = useState({});

  const { state } = useContext(ingredientContext);

  const objectSum = useCallback((a, b) => {
    let result = {};
    for (let item in a) {
      if (typeof (a[item]) !== "object") {

        if (isNaN(a[item]) && !isNaN(b[item])) {
          result[item] = b[item];
        } else if (!isNaN(a[item]) && isNaN(b[item])) {
          result[item] = a[item];
        } else {
          result[item] = a[item] + b[item];
        }
      } else if (typeof (a[item]) === "object") {
        result[item] = objectSum(a[item], b[item]);
      }
    }
    return (result)
  }, [])

  const objectRound = useCallback((inputObject) => {
    let result = {};
    for (let item in inputObject) {
      if (typeof (inputObject[item]) !== "object") {
        if (isNaN(inputObject[item])) {
          result[item] = "-";
        } else {
          result[item] = Math.round((inputObject[item] + Number.EPSILON) * 100) / 100;
        }
      } else if (typeof (inputObject[item]) === "object") {
        result[item] = objectRound(inputObject[item]);
      }
    }
    return result;
  }, [])

  useEffect(() => {
    const calculateResult = () => {
      let nutrition =
      {
        calories: "-",
        macros: {
          carbs: {
            total: "-",
            fiber: "-",
            sugar: "-",
          },
          fats: {
            total: "-",
            saturated: "-",
            cholesterol: "-",
          },
          proteins: "-"
        },
        micros: {
          iron: "-",
          calcium: "-",
          potassium: "-",
          sodium: "-",
          omega3: "-"
        },
        vitamins: {
          a: "-",
          c: "-",
          d: "-",
          e: "-",
          k: "-",
          b1: "-",
          b2: "-",
          b5: "-",
          b6: "-",
          b12: "-"
        }
      }

      for (const item in state.nutritionList) {
        nutrition = { ...objectSum(nutrition, state.nutritionList[item]) };
      }
      nutrition = { ...objectRound(nutrition) };
      setResult({
        ...nutrition
      });
    };
    calculateResult();
  }, [state]);

  return (
    <div className="px-3 rounded-lg h-[100%] text-background font-light">
      <h2 className="h-[33px] mb-[10px] grid items-center text-lg">
        {!state.back ?
          "Results:"
          :
          "Results (Per 100g Food Weight)"
        }
      </h2>
      <div className="mb-4">
        <CircularGraph
          id={"total-result"}
          middleValue={{
            legend: "Calories",
            value: result.calories ? Math.round(result.calories * 100 / (state.foodProperties.foodWeight? state.foodProperties.foodWeight : 100)) : 0,
            icon: "calories"
          }}
          data={[
            {
              name: "Fat",
              value: result.macros ? result.macros.fats.total * 100 / (state.foodProperties.foodWeight? state.foodProperties.foodWeight : 100) : 0,
              color: "rgb(230,84,6)",
              icon: "fats",
              strokeWidth: "5",
              hoverStrokeWidth: "10"
            },
            {
              name: "Proteins",
              value: result.macros ? result.macros.proteins * 100 / (state.foodProperties.foodWeight? state.foodProperties.foodWeight : 100) : 0,
              color: "rgb(255,165,0)",
              icon: "proteins",
              strokeWidth: "5",
              hoverStrokeWidth: "10"
            },
            {
              name: "Carbs",
              value: result.macros ? result.macros.carbs.total * 100 / (state.foodProperties.foodWeight? state.foodProperties.foodWeight : 100) : 0,
              color: "rgb(5,125,240)",
              icon: "carbs",
              strokeWidth: "5",
              hoverStrokeWidth: "10"
            }
          ]}
          options={{
            showLegend: true,
            showMiddleValue: true,
            showCenterIcons: false,
            iconSize: 15,
            padding: 10
          }}
        />
      </div>
      {result.macros ?
        <div className="px-3 py-3 border-t-[1px] border-border dark:border-border-dark">
          <h2 className="text-base mb-2">Macros</h2>
          <div className="text-sm ml-[1ch]">
            <p className="flex justify-between"><span>Carbs:</span><span>{result.macros.carbs.total} g</span></p>
            <p className="flex justify-between ml-[1ch]"><span>Dietary Fiber:</span><span>{result.macros.carbs.fiber} g</span></p>
            <p className="flex justify-between ml-[1ch]"><span>Sugar:</span><span>{result.macros.carbs.sugar} g</span></p>
          </div>
          <div className="text-sm ml-[1ch] mt-2">
            <p className="flex justify-between"><span>Fat:</span><span>{result.macros.fats.total} g</span></p>
            <p className="flex justify-between ml-[1ch]"><span>Saturated Fat:</span><span>{result.macros.fats.saturated} g</span></p>
            <p className="flex justify-between ml-[1ch]"><span>Cholesterol:</span><span>{result.macros.fats.cholesterol} mg</span></p>
          </div>
          <div className="text-sm ml-[1ch] mt-2">
            <p className="flex justify-between"><span>Proteins:</span><span>{result.macros.proteins} g</span></p>
          </div>
        </div>
        : ""}
      {result.micros ?
        <div className="px-3 py-3 border-t-[1px] border-border dark:border-border-dark">
          <h2 className="text-base mb-2">Micros</h2>
          <div className="text-sm ml-[1ch]">
            <p className="flex justify-between"><span>Iron:</span><span>{result.micros.iron} mg</span></p>
            <p className="flex justify-between"><span>Calcium:</span><span>{result.micros.calcium} mg</span></p>
            <p className="flex justify-between"><span>Potassium:</span><span>{result.micros.potassium} mg</span></p>
            <p className="flex justify-between"><span>Sodium:</span><span>{result.micros.potassium} mg</span></p>
            <p className="flex justify-between"><span>omega-3:</span><span>{result.micros.omega3} g</span></p>

          </div>
        </div>
        : ""
      }
      {result.vitamins ?
        <div className="px-3 py-3 border-t-[1px] border-border dark:border-border-dark">
          <h2 className="text-base mb-2">Vitamins</h2>
          <div className="text-sm ml-[1ch] grid grid-cols-2">
            <div className="pr-[10px]">
              <p className="flex justify-between"><span>A:</span><span>{result.vitamins.a} μg</span></p>
              <p className="flex justify-between"><span>C:</span><span>{result.vitamins.c} mg</span></p>
              <p className="flex justify-between"><span>D:</span><span>{result.vitamins.d} μg</span></p>
              <p className="flex justify-between"><span>E:</span><span>{result.vitamins.e} mg</span></p>
              <p className="flex justify-between"><span>K:</span><span>{result.vitamins.k} mg</span></p>
            </div>
            <div className="pl-[10px] border-l-[1px] border-border dark:border-border-dark">
              <p className="flex justify-between"><span>B1:</span><span>{result.vitamins.b1} mg</span></p>
              <p className="flex justify-between"><span>B2:</span><span>{result.vitamins.b2} mg</span></p>
              <p className="flex justify-between"><span>B5:</span><span>{result.vitamins.b5} mg</span></p>
              <p className="flex justify-between"><span>B6:</span><span>{result.vitamins.b6} mg</span></p>
              <p className="flex justify-between"><span>B12:</span><span>{result.vitamins.b12} μg</span></p>
            </div>
          </div>
        </div>
        : ""}

    </div>
  );
};

export default ListResults;
