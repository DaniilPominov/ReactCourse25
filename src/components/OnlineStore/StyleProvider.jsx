import { createContext, useState, useEffect } from "react";

export const StyleContext = createContext();

export const StyleProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = JSON.parse(localStorage.getItem('theme'));
        return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : "dark";
    });

    useEffect(() => {

        const savedTheme = JSON.parse(localStorage.getItem('theme'));
        
        if (savedTheme === 'dark' || savedTheme === 'light') {
            console.log("Loaded theme from storage:", savedTheme);
            setTheme(savedTheme);
        } else {
            console.log("No valid theme in storage, using default");
        }
    }, []);
    
    useEffect(() => {
        console.log("Saving theme to storage:", theme);
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    const changeTheme = () => {
        setTheme(theme === "dark"? "light" : "dark");
    }

    return (
        <StyleContext.Provider value={{theme, changeTheme}}>
            {children}
        </StyleContext.Provider>
    )
}
