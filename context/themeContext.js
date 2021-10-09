import React, { createContext, useState, useEffect, useContext } from 'react';

const defaultContext = {
    toggleTheme: () => {
        console.warn('Should have been overriden');
    },
    isDark: true,
};

const ThemeContext = createContext(defaultContext);

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);

    const addClassToBody = (darkTheme) => {
        if(darkTheme){
            document.body.classList.add('theme-dark')
            document.body.classList.remove('theme-light')
        } else {
            document.body.classList.add('theme-light')
            document.body.classList.remove('theme-dark')
        }
    }

    useEffect(() => {
        const storageTheme = JSON.parse(localStorage.getItem('ThemeContext:isDark'));
        if (storageTheme !== undefined && storageTheme !== null) {
            setIsDark(storageTheme);
            addClassToBody(storageTheme)
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setIsDark(false);
            addClassToBody(false)
        } else {
            setIsDark(true);
            addClassToBody(true)
        }
    }, []);

    const context = {
        toggleTheme: () => {
            localStorage.setItem('ThemeContext:isDark', String(!isDark));
            addClassToBody(!isDark)
            setIsDark(!isDark);
        },
        isDark,
    };
    return (
        <ThemeContext.Provider value={context}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme(){
    return useContext(ThemeContext)
}