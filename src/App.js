import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IngredientProvider } from "./context/meal-context";
import { userContext } from "./context/user-context";
import { useEffect, useState, useContext, useCallback } from "react";

import Navbar from "./shared/components/navbar/navbar";
import User from "./user/pages/user";
import SideMenu from "./shared/components/side-menu/side-menu";
import ProtectedRoute from "./shared/components/protected-route";
import MealEditor from "./meal-editor/pages/meal-editor";


function App() {
  const { userState, dispatch } = useContext(userContext);
  const [darkMode, setDarkMode] = useState("");

  const getPreferedMode = useCallback(() => {
    let storedMod = window.localStorage.getItem("_dark_mode");

    if (storedMod !== null) {
      dispatch({ type: "changeDarkMode", payload: storedMod });
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      dispatch({ type: "changeDarkMode", payload: "dark" });
    } else {
      dispatch({ type: "changeDarkMode", payload: "" });
    }
  }, []);

  useEffect(() => {
    getPreferedMode();
  }, []);

  useEffect(() => {
    if (userState.userSettings?.darkMode !== undefined) {
      setDarkMode(userState.userSettings.darkMode);
    }
  }, [userState]);

  const changeToDarkMode = useCallback(() => {
    dispatch({ type: "changeDarkMode", payload: "dark" });
  }, []);

  const changeToLightMode = useCallback(() => {
    dispatch({ type: "changeDarkMode", payload: "" });
  }, []);

  return (
    <div className={darkMode + " h-[100vh] overflow-hidden"}>
      <div className="bg-background dark:bg-primary-dark w-full h-full flex">
        <Router>
          <SideMenu />
          <div className="w-[100%] h-[100vh] dark:text-text-dark text-text dark:bg-background-dark rounded-l-lg">
            <Navbar
              changeToDarkMode={changeToDarkMode}
              changeToLightMode={changeToLightMode}
            />
            <div className="w-[100%] h-[calc(100%-70px)]">
              <Switch>
                <Route path="/list-ingreds">
                  <ProtectedRoute>
                    <IngredientProvider>
                      <MealEditor />
                    </IngredientProvider>
                  </ProtectedRoute>
                </Route>
                <Route path="/user">
                  <User />
                </Route>
                <Route path="*">
                  <h1>404 Page Not Found!</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
