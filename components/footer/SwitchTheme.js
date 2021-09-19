import * as React from 'react';
import styles from "../../styles/modules/footer.module.scss";
import {useEffect, useState} from "react";

const SwitchTheme = (props) => {

    const [theme, setTheme] = useState("dark")

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        document.body.className = `theme-${theme}`;
        return () => { document.body.className = ''; }
    }, [theme]);

    return (
        <div>
            <strong><span>Theme</span></strong>
            <div className={styles.switch}>
                <input id="toggleDarkMode" checked={theme === 'dark'} onChange={toggleTheme} name="toggleDarkMode" type="checkbox"/>
                <label htmlFor="toggleDarkMode"/>
            </div>
        </div>
    )
}

export default SwitchTheme