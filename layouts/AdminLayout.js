import React, {useState} from 'react';
import styles from "../styles/layouts/admin.module.scss";
import Link from "next/link";

const AdminLayout = (props) => {

    const {} = props
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className={styles.adminLayout}>

            <header className={`${styles.adminHeader} ${!toggleMenu ? styles.adminHeaderClose : ""}`}>
                <nav>
                    <Link href="/" aria-label="forecastr logo" passHref>
                        <a className={styles.logo}>Lecuistotduweb</a>
                    </Link>
                    <button onClick={e => setToggleMenu(!toggleMenu)} className={styles.toggleMobMenu} aria-expanded="false" aria-label="open menu">
                        {toggleMenu ? 'fermer' : 'menu'}
                    </button>
                    <ul className="admin-menu">
                        <li className={styles.adminMenuHeading}>
                            <h3>Pages</h3>
                        </li>
                        <li className={styles.adminMenuLink}>
                            <Link href="/admin" passHref>
                                <a>homepage</a>
                            </Link>
                        </li>
                        <li className={styles.adminMenuLink}>
                            <Link href="/admin/works" passHref>
                                <a>works</a>
                            </Link>
                        </li>
                        <li className={styles.adminMenuLink}>
                            <Link href="/admin/about" passHref>
                                <a>about</a>
                            </Link>
                        </li>
                        <li className={styles.adminMenuLink}>
                            <Link href="/admin/contact" passHref>
                                <a>contact</a>
                            </Link>
                        </li>
                        <li className={styles.adminMenuHeading}>
                            <h3>Settings</h3>
                        </li>
                        <li className={styles.adminMenuLink}>
                            <Link href="/admin/options" passHref>
                                <a>Options</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <section className={styles.adminContent}>
                <section className={styles.adminContentTop}>
                    <form className={styles.searchInputContainer}>
                        <input className={styles.searchInput} type="search" placeholder="Search Pages..."/>
                        <button className={styles.searchButton} type="submit" aria-label="submit form">
                            rechercher
                        </button>
                    </form>
                    <div className="admin-profile">
                        <a href="/logout">logout</a>
                    </div>
                </section>

                {/* Page Title */}
                {props.title && (<h1 dangerouslySetInnerHTML={{__html: props.title}}/>)}

                {/* Page Content */}
                {props.children}

                <footer className={styles.adminFooter}>
                    <div>made by <Link href="/">LeCuistotduWeb</Link></div>
                </footer>
            </section>
        </div>
    )
}

export default AdminLayout