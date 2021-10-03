import * as React from 'react';
import styles from '../../styles/modules/header.module.scss'
import Link from 'next/link'

const Header = (props) => {
    const {} = props
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <Link href="/">
                    LeCuistotduWeb
                </Link>
            </div>
            <nav className={styles.headerNav}>
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
                </ul>
            </nav>
        </div>
    )
}

export default Header