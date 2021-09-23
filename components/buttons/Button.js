import React, {} from 'react';
import styles from "../../styles/modules/buttons.module.scss";

const Button = (props) => {
    return (
        <button className={styles.button}>
            {props.children}
        </button>
    )
}

export default Button