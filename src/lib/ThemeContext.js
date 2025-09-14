"use client";
import React, { createContext, useState, useContext } from "react";
import { themes } from "../assets/themes";

const themeNames = Object.keys(themes);
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState(themeNames[0]);
    const theme = themes[themeName];

    // Cycle through all themes
    const toggleTheme = () => {
        setThemeName((prev) => {
            const currentIndex = themeNames.indexOf(prev);
            const nextIndex = (currentIndex + 1) % themeNames.length;
            return themeNames[nextIndex];
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, themeName, setThemeName, toggleTheme, themeNames }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);