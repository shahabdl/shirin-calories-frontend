import { rest } from 'msw';

export const handlers = [
    rest.get("http://localhost/api/ingredients/", (req, res, ctx) => {

        if (req.url.searchParams.get('name') === "noresults") {
            return res(ctx.json({}))
        }
        return res(
            ctx.json({
                "ingredients": [
                    {
                        "_id": "640b4e416df68b634ccf2516",
                        "name": "lentils",
                        "types": {
                            "Boiled": {
                                "calories": 116,
                                "macros": { "carbs": { "total": 20.1, "fiber": 7.9, "sugar": 1.8 }, "fats": { "total": 0.38, "saturated": 0.05, "cholesterol": 0 }, "proteins": 9.02 },
                                "micros": { "iron": 3.33, "calcium": 19, "potassium": 369, "sodium": 2, "omega3": 0.175 },
                                "vitamins": { "a": 8, "c": 1.5, "b6": 0.178, "b1": 0.169, "b12": 0, "b2": 0.073, "b3": 1.06, "b5": 0.638, "d": 0, "e": 0.11, "k": 1.7 }
                            },
                            "Raw": {
                                "calories": 352,
                                "macros": { "carbs": { "total": 63.4, "fiber": 10.7, "sugar": 2.03 }, "fats": { "total": 1.1, "saturated": 0.2, "cholesterol": 0 }, "proteins": 24.6 },
                                "micros": { "iron": 6.51, "calcium": 35, "potassium": 677, "sodium": 6, "omega3": 0.526 },
                                "vitamins": { "a": 39, "c": 4, "b6": 0.54, "b1": 0.873, "b12": 0, "b2": 0.211, "b3": 2.6, "b5": 2.14, "d": 0, "e": 0.49, "k": 5 }
                            }
                        },
                        "author": "63d565721abd17618eaa28a6",
                        "foodImage": "lentils.jpg"
                    }],
                "usersFoods": []
            })
        )
    })
]