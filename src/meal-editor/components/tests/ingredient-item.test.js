import { screen, render } from '@testing-library/react'
import IngredientItem from '../ingredient-item'
import { IngredientProvider } from '../../../context/meal-context';
import { UserProvider } from '../../../context/user-context';

const mockItem = {
    "item": {
      "_id": "64229518889cf59d6ca18c6b",
      "name": "test",
      "owner": "shahab",
      "totalWeight": 100,
      "foodImage": "foodImage-64171f94508aeb30f9e718f1-test-64229518889cf59d6ca18c6b",
      "types": {
        "User Food": {
          "calories": 116,
          "macros": {
            "carbs": {
              "total": 20.1,
              "fiber": 7.9,
              "sugar": 1.8
            },
            "fats": {
              "total": 0.38,
              "saturated": 0.05,
              "cholesterol": 0
            },
            "proteins": 9.02
          },
          "micros": {
            "iron": 3.33,
            "calcium": 19,
            "potassium": 369,
            "sodium": 2,
            "omega3": 0.175
          },
          "vitamins": {
            "a": 8,
            "c": 1.5,
            "d": 0,
            "e": 0.11,
            "k": 1.7,
            "b1": 0.169,
            "b2": 0.073,
            "b5": 0.638,
            "b6": 0.178,
            "b12": 0
          }
        }
      }
    },
    "types": "User Food",
    "weight": 100,
    "unit": "g"
  }

it('should display "app" text when food is not from users', async() => {
    const mockItem = {
        "item": {
          "_id": "64229518889cf59d6ca18c6b",
          "name": "test",
          "author": "notShahab",
          "totalWeight": 100,
          "foodImage": "",
          "types": {
            "User Food": {
              "calories": 116,
              "macros": {
                "carbs": {
                  "total": 20.1,
                },
                "fats": {
                  "total": 0.38,
                },
                "proteins": 9.02
              },
            }
          }
        },
        "types": "User Food",
        "weight": 100,
        "unit": "g"
      }
    const state = {
        "ingredientList": {
            "640b4e416df68b634ccf2516": {
                "item": {
                    "_id": "640b4e416df68b634ccf2516",
                    "name": "lentils",
                    "types": {
                        "Boiled": {
                            "calories": 116,
                            "macros": {
                                "carbs": {
                                    "total": 20.1,
                                    "fiber": 7.9,
                                    "sugar": 1.8
                                },
                                "fats": {
                                    "total": 0.38,
                                    "saturated": 0.05,
                                    "cholesterol": 0
                                },
                                "proteins": 9.02
                            },
                            "micros": {
                                "iron": 3.33,
                                "calcium": 19,
                                "potassium": 369,
                                "sodium": 2,
                                "omega3": 0.175
                            },
                            "vitamins": {
                                "a": 8,
                                "c": 1.5,
                                "b6": 0.178,
                                "b1": 0.169,
                                "b12": 0,
                                "b2": 0.073,
                                "b3": 1.06,
                                "b5": 0.638,
                                "d": 0,
                                "e": 0.11,
                                "k": 1.7
                            }
                        },
                    },
                    "author": "shahab",
                    "foodImage": "lentils.jpg"
                },
                "types": "Boiled",
                "weight": 100,
                "unit": "g"
            }
        },
        "nutritionList": {
            "640b4e416df68b634ccf2516": {
                "calories": 116,
                "macros": {
                    "carbs": {
                        "total": 20.1,
                        "fiber": 7.9,
                        "sugar": 1.8
                    },
                    "fats": {
                        "total": 0.38,
                        "saturated": 0.05,
                        "cholesterol": 0
                    },
                    "proteins": 9.02
                },
                "micros": {
                    "iron": 3.33,
                    "calcium": 19,
                    "potassium": 369,
                    "sodium": 2,
                    "omega3": 0.18
                },
                "vitamins": {
                    "a": 8,
                    "c": 1.5,
                    "b6": 0.18,
                    "b1": 0.17,
                    "b12": 0,
                    "b2": 0.07,
                    "b3": 1.06,
                    "b5": 0.64,
                    "d": 0,
                    "e": 0.11,
                    "k": 1.7
                }
            }
        },
        "foodProperties": {
            "uniqueFoodID": "",
            "foodName": "",
            "foodWeight": 100,
            "foodUnit": "g",
            "foodImage": "",
            "foodImageChanged": false
        },
        "changed": false,
        "lisIsEmpty": false,
        "back": false,
        "refetch": {
            "reFetchID": "",
            "reFetchNewID": "",
            "needReFetch": false
        }
    }
    const dispatch = jest.fn();

    const userState = {
        "userName": "shahab",
        "userID": "Shahab",
        "userEmail": "shahab5191@yahoo.com",
        "userAccessToken": "",
        "userAvatar": {
          "image": "",
          "type": "svg"
        },
        "userSettings": {
          "darkMode": "dark"
        }
      }

    render(
        <UserProvider testValue={{userState, dispatch}}>
            <IngredientProvider testValue={{ state, dispatch }}>
                <IngredientItem item={mockItem} />
            </IngredientProvider>
        </UserProvider>
    );

    const editButton = screen.getByText(/app/i)
    expect(editButton).toBeTruthy();

})

it('should display "user" text when food is from users but this user is not the owner', async() => {
    const mockItem = {
        "item": {
          "_id": "64229518889cf59d6ca18c6b",
          "name": "test",
          "owner": "notShahab",
          "totalWeight": 100,
          "foodImage": "",
          "types": {
            "User Food": {
              "calories": 116,
              "macros": {
                "carbs": {
                  "total": 20.1,
                },
                "fats": {
                  "total": 0.38,
                },
                "proteins": 9.02
              },
            }
          }
        },
        "types": "User Food",
        "weight": 100,
        "unit": "g"
      }
      
    const state = {
        "ingredientList": {
            "640b4e416df68b634ccf2516": {
                "item": {
                    "_id": "640b4e416df68b634ccf2516",
                    "name": "lentils",
                    "types": {
                        "Boiled": {
                            "calories": 116,
                            "macros": {
                                "carbs": {
                                    "total": 20.1,
                                    "fiber": 7.9,
                                    "sugar": 1.8
                                },
                                "fats": {
                                    "total": 0.38,
                                    "saturated": 0.05,
                                    "cholesterol": 0
                                },
                                "proteins": 9.02
                            },
                        },
                    },
                    "author": "shahab",
                    "foodImage": "lentils.jpg"
                },
                "types": "Boiled",
                "weight": 100,
                "unit": "g"
            }
        },
        "nutritionList": {
            "640b4e416df68b634ccf2516": {
                "calories": 116,
                "macros": {
                    "carbs": {
                        "total": 20.1,
                        "fiber": 7.9,
                        "sugar": 1.8
                    },
                    "fats": {
                        "total": 0.38,
                        "saturated": 0.05,
                        "cholesterol": 0
                    },
                    "proteins": 9.02
                },
            }
        },
        "foodProperties": {
            "uniqueFoodID": "",
            "foodName": "",
            "foodWeight": 100,
            "foodUnit": "g",
            "foodImage": "",
            "foodImageChanged": false
        },
        "changed": false,
        "lisIsEmpty": false,
        "back": false,
        "refetch": {
            "reFetchID": "",
            "reFetchNewID": "",
            "needReFetch": false
        }
    }

    const dispatch = jest.fn();

    const userState = {
        "userName": "shahab",
        "userID": "shahab",
        "userEmail": "shahab5191@yahoo.com",
        "userAccessToken": "",
        "userAvatar": {
          "image": "",
          "type": "svg"
        },
        "userSettings": {
          "darkMode": "dark"
        }
      }

    render(
        <UserProvider testValue={{userState, dispatch}}>
            <IngredientProvider testValue={{ state, dispatch }}>
                <IngredientItem item={mockItem} />
            </IngredientProvider>
        </UserProvider>
    );

    const editButton = screen.getByTestId("author-indicator")
    expect(editButton.innerHTML).toMatch(/user/i);

})

it('should display "Edit" button when this user is owner of the food', () => {
    const state = {
        "ingredientList": {
            "640b4e416df68b634ccf2516": {
                "item": {
                    "_id": "640b4e416df68b634ccf2516",
                    "name": "lentils",
                    "types": {
                        "Boiled": {
                            "calories": 116,
                            "macros": {
                                "carbs": {
                                    "total": 20.1,
                                    "fiber": 7.9,
                                    "sugar": 1.8
                                },
                                "fats": {
                                    "total": 0.38,
                                    "saturated": 0.05,
                                    "cholesterol": 0
                                },
                                "proteins": 9.02
                            },
                            "micros": {
                                "iron": 3.33,
                                "calcium": 19,
                                "potassium": 369,
                                "sodium": 2,
                                "omega3": 0.175
                            },
                            "vitamins": {
                                "a": 8,
                                "c": 1.5,
                                "b6": 0.178,
                                "b1": 0.169,
                                "b12": 0,
                                "b2": 0.073,
                                "b3": 1.06,
                                "b5": 0.638,
                                "d": 0,
                                "e": 0.11,
                                "k": 1.7
                            }
                        },
                        "Raw": {
                            "calories": 352,
                            "macros": {
                                "carbs": {
                                    "total": 63.4,
                                    "fiber": 10.7,
                                    "sugar": 2.03
                                },
                                "fats": {
                                    "total": 1.1,
                                    "saturated": 0.2,
                                    "cholesterol": 0
                                },
                                "proteins": 24.6
                            },
                            "micros": {
                                "iron": 6.51,
                                "calcium": 35,
                                "potassium": 677,
                                "sodium": 6,
                                "omega3": 0.526
                            },
                            "vitamins": {
                                "a": 39,
                                "c": 4,
                                "b6": 0.54,
                                "b1": 0.873,
                                "b12": 0,
                                "b2": 0.211,
                                "b3": 2.6,
                                "b5": 2.14,
                                "d": 0,
                                "e": 0.49,
                                "k": 5
                            }
                        }
                    },
                    "author": "shahab",
                    "foodImage": "lentils.jpg"
                },
                "types": "Boiled",
                "weight": 100,
                "unit": "g"
            }
        },
        "nutritionList": {
            "640b4e416df68b634ccf2516": {
                "calories": 116,
                "macros": {
                    "carbs": {
                        "total": 20.1,
                        "fiber": 7.9,
                        "sugar": 1.8
                    },
                    "fats": {
                        "total": 0.38,
                        "saturated": 0.05,
                        "cholesterol": 0
                    },
                    "proteins": 9.02
                },
                "micros": {
                    "iron": 3.33,
                    "calcium": 19,
                    "potassium": 369,
                    "sodium": 2,
                    "omega3": 0.18
                },
                "vitamins": {
                    "a": 8,
                    "c": 1.5,
                    "b6": 0.18,
                    "b1": 0.17,
                    "b12": 0,
                    "b2": 0.07,
                    "b3": 1.06,
                    "b5": 0.64,
                    "d": 0,
                    "e": 0.11,
                    "k": 1.7
                }
            }
        },
        "foodProperties": {
            "uniqueFoodID": "",
            "foodName": "",
            "foodWeight": 100,
            "foodUnit": "g",
            "foodImage": "",
            "foodImageChanged": false
        },
        "changed": false,
        "lisIsEmpty": false,
        "back": false,
        "refetch": {
            "reFetchID": "",
            "reFetchNewID": "",
            "needReFetch": false
        }
    }
    const dispatch = jest.fn();

    const userState = {
        "userName": "shahab",
        "userID": "shahab",
        "userEmail": "shahab5191@yahoo.com",
        "userAccessToken": "",
        "userAvatar": {
          "image": "",
          "type": "svg"
        },
        "userSettings": {
          "darkMode": "dark"
        }
      }

    render(
        <UserProvider testValue={{userState, dispatch}}>
            <IngredientProvider testValue={{ state, dispatch }}>
                <IngredientItem item={mockItem} />
            </IngredientProvider>
        </UserProvider>
    );

    const editButton = screen.getByText(/edit/i)
    expect(editButton).toBeTruthy();

})

it('should have right initial values when provided', async() => {
    const mockItem = {
        "item": {
          "_id": "64229518889cf59d6ca18c6b",
          "name": "test",
          "author": "notShahab",
          "totalWeight": 100,
          "foodImage": "",
          "types": {
            "raw": {
              "calories": 116,
              "macros": {
                "carbs": {
                  "total": 20.1,
                },
                "fats": {
                  "total": 0.38,
                },
                "proteins": 9.02
              },
            }
          }
        },
        "types": "raw",
        "weight": 150,
        "unit": "oz"
      }
    const state = {
        "ingredientList": {
            "640b4e416df68b634ccf2516": {
                "item": {
                    "_id": "640b4e416df68b634ccf2516",
                    "name": "lentils",
                    "types": {
                        "Boiled": {
                            "calories": 116,
                            "macros": {
                                "carbs": {
                                    "total": 20.1,
                                    "fiber": 7.9,
                                    "sugar": 1.8
                                },
                                "fats": {
                                    "total": 0.38,
                                    "saturated": 0.05,
                                    "cholesterol": 0
                                },
                                "proteins": 9.02
                            },
                            "micros": {
                                "iron": 3.33,
                                "calcium": 19,
                                "potassium": 369,
                                "sodium": 2,
                                "omega3": 0.175
                            },
                            "vitamins": {
                                "a": 8,
                                "c": 1.5,
                                "b6": 0.178,
                                "b1": 0.169,
                                "b12": 0,
                                "b2": 0.073,
                                "b3": 1.06,
                                "b5": 0.638,
                                "d": 0,
                                "e": 0.11,
                                "k": 1.7
                            }
                        },
                    },
                    "author": "shahab",
                    "foodImage": "lentils.jpg"
                },
                "types": "Boiled",
                "weight": 100,
                "unit": "g"
            }
        },
        "nutritionList": {
            "640b4e416df68b634ccf2516": {
                "calories": 116,
                "macros": {
                    "carbs": {
                        "total": 20.1,
                        "fiber": 7.9,
                        "sugar": 1.8
                    },
                    "fats": {
                        "total": 0.38,
                        "saturated": 0.05,
                        "cholesterol": 0
                    },
                    "proteins": 9.02
                },
                "micros": {
                    "iron": 3.33,
                    "calcium": 19,
                    "potassium": 369,
                    "sodium": 2,
                    "omega3": 0.18
                },
                "vitamins": {
                    "a": 8,
                    "c": 1.5,
                    "b6": 0.18,
                    "b1": 0.17,
                    "b12": 0,
                    "b2": 0.07,
                    "b3": 1.06,
                    "b5": 0.64,
                    "d": 0,
                    "e": 0.11,
                    "k": 1.7
                }
            }
        },
        "foodProperties": {
            "uniqueFoodID": "",
            "foodName": "",
            "foodWeight": 100,
            "foodUnit": "g",
            "foodImage": "",
            "foodImageChanged": false
        },
        "changed": false,
        "lisIsEmpty": false,
        "back": false,
        "refetch": {
            "reFetchID": "",
            "reFetchNewID": "",
            "needReFetch": false
        }
    }
    const dispatch = jest.fn();

    const userState = {
        "userName": "shahab",
        "userID": "Shahab",
        "userEmail": "shahab5191@yahoo.com",
        "userAccessToken": "",
        "userAvatar": {
          "image": "",
          "type": "svg"
        },
        "userSettings": {
          "darkMode": "dark"
        }
      }

    render(
        <UserProvider testValue={{userState, dispatch}}>
            <IngredientProvider testValue={{ state, dispatch }}>
                <IngredientItem item={mockItem} />
            </IngredientProvider>
        </UserProvider>
    );
    const amountInput = screen.getByRole('spinbutton')
    const typeDropDown = screen.getByTestId('type-dropdown')
    const unitDropDown = screen.getByTestId('unit-dropdown')
    expect(amountInput.value).toBe('150');
    expect(typeDropDown).toHaveTextContent('raw');
    expect(unitDropDown).toHaveTextContent('oz');

})
