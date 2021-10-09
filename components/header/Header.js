import React, {useState} from 'react';
import styles from '../../styles/modules/header.module.scss'
import Link from 'next/link'
import SwitchTheme from "../footer/SwitchTheme";

const MenuBurgerIcon = () => (
    <svg className={styles.burgerIcon} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 34 27" enableBackground="new 0 0 34 27">
        <rect fill="#FFFFFF" width="34" height="4"/>
        <rect y="11" fill="#FFFFFF" width="34" height="4"/>
        <rect y="23" fill="#FFFFFF" width="34" height="4"/>
    </svg>
)

const MenuCloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className={styles.closeIcon}><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
)

const Header = (props) => {
    const {} = props
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.brand}>
                    <Link href="/">
                        LeCuistotduWeb
                    </Link>
                </div>
                <button className={styles.menuIcon} onClick={handleToggleMenu}>
                    {toggleMenu ? <MenuCloseIcon/> : <MenuBurgerIcon/>}
                </button>
            </div>
            <nav className={`${styles.headerNav} ${toggleMenu ? styles.headerNavOpen : ''}`}>
                <ul className={styles.listItems}>
                    <li className={styles.listItem}>
                        <Link href="/works">
                            <a className={`${styles.listItemLink}`}>Works</a>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/experiences">
                            <a className={`${styles.listItemLink}`}>Experiences</a>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href="/contact">
                            <a className={`${styles.listItemLink}`}>Contact</a>
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <SwitchTheme/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header