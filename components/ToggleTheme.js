import React from "react";
import { ThemeIcon } from "./Icons";

const changeTheme = async () => {
    const mode = localStorage.getItem("mode") ? localStorage.getItem("mode") : "light";
    if (mode === "dark") {
        localStorage.setItem("mode", "light");
        document.documentElement.dataset.theme = "light";
    } else {
        localStorage.setItem("mode", "dark");
        document.documentElement.dataset.theme = "dark";
    }
}

const ToggleTheme = () => {
    return <ThemeIcon onClick={() => changeTheme()}  />;
};

export default ToggleTheme;