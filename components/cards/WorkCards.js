import React, {} from 'react';
import styles from "../../styles/modules/cards.module.scss";

const WorkCards = (props) => {

    const {title, content, href, onRight=false} = props

    return (
        <div className={`${styles.card} ${onRight ? styles.cardRight : styles.cardLeft}`}>
            <div className={styles.cardDate}>2016 - 2018</div>
            <div className={styles.cardTitle}>cart title</div>
            <div className={styles.cardContent}>this is the cart content</div>
        </div>
    )
}

export default WorkCards