import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../../../context/user-context"
import DropdownMenu from "./dropdown-menu";
import { fetchAuth } from "../../../../user/utils/fetch-auth";
import ToggleButton from "../../ui/toggle-button";
import SvgIcon from "../../ui/icons";
import { Link } from "react-router-dom";

const UserMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { userState, dispatch } = useContext(userContext)
    const [showMenu, setShowMenu] = useState(true);

    const onMenuOpened = (status) => {
        setIsOpen(status);
    }

    const changeDarkMode = (status) => {
        let mode;
        switch (status) {
            case false:
                mode = "dark"
                break;
            case true:
                mode = "";
                break;
            default:
                mode = "";
                break;
        }

        dispatch({ type: "changeDarkMode", payload: mode });
    }

    const signOutHandler = () => {
        dispatch({ type: "logOutUser", payload: "" });
    }

    useEffect(() => {
        if (!userState.userAccessToken) {
            let storedToken = window.localStorage.getItem('_access_token');
            if (!storedToken) {
                dispatch({ type: "logOutUser", payload: "" });
            }
        } else {
            fetchAuth({ method: "get", url: "/user" })
                .then((res) => {
                    if (!res.ok) {
                        dispatch({ type: "logOutUser", payload: "" });
                        return;
                    } else {
                        return res.json();
                    }
                })
                .then((res) => {
                    if (res) {
                        dispatch({
                            type: "setUser",
                            payload: {
                                userName: res.userName,
                                userID: res.userID,
                                userAccessToken: res.token,
                                email: res.email,
                                userAvatar: { image: res.avatar.image, type: res.avatar.type }
                            },
                        });

                    }
                })
                .catch((err) => {
                    console.log(err);
                    dispatch({ type: "logOutUser", payload: "" });
                });
        }
    }, [])

    useEffect(() => {
        if (!userState.userAccessToken) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
        let avatarDom = document.getElementById("user-avatar");
        if (avatarDom) {
            avatarDom.innerHTML = userState.userAvatar.image;
        }
    }, [userState])

    useEffect(() => {
        let avatarDom = document.getElementById("user-avatar");
        if (avatarDom) {
            avatarDom.innerHTML = userState.userAvatar.image;
        }
    }, [showMenu]);

    if (showMenu) {
        return (
            <DropdownMenu
                ID="userM-menu"
                className="ml-auto z-10"
                label="first-child"
                buttonClass="z-10"
                onChange={onMenuOpened}
                listClass="right-0 w-[250px] mt-0 pt-[60px] top-0 rounded-xl z-[-1]"
            >
                <div className={`border-border dark:border-border-dark border-[1px] ${isOpen ? "border-b-0 rounded-b-none" : ""} w-[250px] p-[5px] rounded-xl flex items-center dark:bg-primary-dark bg-primary`}>
                    <div className="flex items-center">
                        <div id="user-avatar" className="rounded-lg overflow-hidden w-[40px] h-[40px] mr-2"></div>
                        <p>{userState.userName}</p>
                    </div>
                    <span className="ml-auto rotate-180 p-2">^</span>
                </div>
                <div className="py-4 border-t-[1px] border-border dark:border-border-dark">
                    <Link className="flex gap-2 dark:hover:text-button-dark hover:text-button transition-color duration-300" to="/">
                        <SvgIcon icon="preferencesIcon" width="25" height="25" className="dark:fill-text-dark fill-text" />
                        <p>Preferences</p>
                    </Link>
                    <Link className="flex gap-2 mt-2 dark:hover:text-button-dark hover:text-button transition-color duration-300 pt-2" to="/">
                        <SvgIcon icon="editProfileIcon" width="25" height="25" className="dark:fill-text-dark fill-text" />
                        <p>Edit Profile</p>
                    </Link>
                </div>
                <div className="py-4 flex border-t-[1px] border-border dark:border-border-dark">
                    <p>Dark Mode</p>
                    <ToggleButton
                        checkedIcon="darkModeSunIcon"
                        unCheckedIcon="darkModeMoonIcon"
                        className="ml-auto"
                        onChange={changeDarkMode}
                        defaultState={userState.userSettings?.darkMode === "dark" ? true : false}
                    />
                </div>
                <div
                    onClick={signOutHandler}
                    className="flex gap-2 dark:hover:text-button-dark hover:text-button transition-color duration-300 cursor-pointer pt-4 border-t-[1px] border-border dark:border-border-dark">
                    <SvgIcon icon="signOutIcon" className="fill-text dark:fill-text-dark" width="25" height="25" />
                    <p>Sign Out</p>
                </div>
            </DropdownMenu>
        )
    }
    return;
}

export default UserMenu;