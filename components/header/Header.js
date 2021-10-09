import React, {useState} from 'react';
import Link from 'next/link'
import SwitchTheme from "../footer/SwitchTheme";

const MenuBurgerIcon = () => (
    <svg className={"burgerIcon"} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 34 27" enableBackground="new 0 0 34 27">
        <rect fill="#FFFFFF" width="34" height="4"/>
        <rect y="11" fill="#FFFFFF" width="34" height="4"/>
        <rect y="23" fill="#FFFFFF" width="34" height="4"/>
    </svg>
)

const MenuCloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className={"closeIcon"}><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
)

const Header = (props) => {
    const {} = props
    // const [toggleMenu, setToggleMenu] = useState(false);

    // const handleToggleMenu = () => {
    //     setToggleMenu(!toggleMenu)
    // }

    return (
        <header className={"header container"}>
            <div className={"brand"}>
                <Link href="/">
                    LeCuistotduWeb
                </Link>
            </div>
            <SwitchTheme/>

            {/*<div className={"headerTop"}>*/}
            {/*    <div className={"brand"}>*/}
            {/*        <Link href="/">*/}
            {/*            LeCuistotduWeb*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*    <button className={"menuIcon"} onClick={handleToggleMenu}>*/}
            {/*        {toggleMenu ? <MenuCloseIcon/> : <MenuBurgerIcon/>}*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<nav className={`${"headerNav"} ${toggleMenu ? "headerNavOpen" : ''}`}>*/}
            {/*    <ul className={"listItems"}>*/}
            {/*        <li className={"listItem"}>*/}
            {/*            <Link href="/works">*/}
            {/*                <a className={`${"listItemLink"}`}>Works</a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={"listItem"}>*/}
            {/*            <Link href="/experiences">*/}
            {/*                <a className={`${"listItemLink"}`}>Experiences</a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={"listItem"}>*/}
            {/*            <Link href="/contact">*/}
            {/*                <a className={`${"listItemLink"}`}>Contact</a>*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={"listItem"}>*/}
            {/*            <SwitchTheme/>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}
        </header>
    )
}

export default Header