import React from 'react';
import useTheme from "../../context/themeContext";

const SwitchTheme = (props) => {
    const {toggleTheme, isDark} = useTheme()

    const handleToggleTheme = () => {
        toggleTheme(!isDark);
    }

    const LightThemeIcon = () => (
        <svg height={24} width={24} className="theme-toggle__icon light-theme-toggle__icon" viewBox="0 0 24 24" role="img"><title>Light theme icon</title>
            <path
                d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"
                fill="var(--color)"/>
        </svg>
    )

    const DarkThemeIcon = () => (
        <svg height={24} width={24} className="theme-toggle__icon dark-theme-toggle__icon" viewBox="0 0 24 24" role="img"><title>Theme icon</title>
            <path
                d="M9,2C7.95,2 6.95,2.16 6,2.46C10.06,3.73 13,7.5 13,12C13,16.5 10.06,20.27 6,21.54C6.95,21.84 7.95,22 9,22A10,10 0 0,0 19,12A10,10 0 0,0 9,2Z"
                fill="var(--color)"/>
        </svg>
    )

    return (
        <div className="theme-switcher">
            <button onClick={handleToggleTheme}>{isDark ? <LightThemeIcon/> : <DarkThemeIcon/>}</button>
        </div>
    )
}

export default SwitchTheme