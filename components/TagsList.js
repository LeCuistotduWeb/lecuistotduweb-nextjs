import React from 'react';
import styles from '../styles/modules/tags.module.scss'

const TagsList = (props) => {

    const {tags} = props

    if(tags && tags.length <= 0)  null

    return (
        <div className={styles.tagContainer}>
            tags: {tags.map((tag, index) => (
                <span className={styles.tag} key={index}>{tag}</span>
            ))}
        </div>
    );
}

export default TagsList