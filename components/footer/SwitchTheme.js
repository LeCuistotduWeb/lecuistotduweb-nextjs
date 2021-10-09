import React from 'react';
import useTheme from "../../context/themeContext";

const SwitchTheme = (props) => {
    const {toggleTheme, isDark} = useTheme()

    const handleToggleTheme = () => {
        toggleTheme(!isDark);
    }

    return (
        <div>
            <div className="switch">
                <button onClick={handleToggleTheme}>{isDark ? '☀️' : '🌙'}</button>
            </div>
        </div>
    )
}

export default SwitchTheme