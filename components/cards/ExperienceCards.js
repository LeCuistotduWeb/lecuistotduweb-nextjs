import React, {} from 'react';
import styles from "../../styles/modules/cards.module.scss";
import Link from "next/link";

const ExperienceCards = (props) => {

    const {title, company, content, href="", date, onRight=false, logo} = props

    const ExperienceCardContent = () => {
        return (
            <div className={`${styles.card} ${onRight ? styles.cardRight : styles.cardLeft}`}>
                {logo && <img className={styles.cardLogo} src={logo} alt={title}/>}

                {date && <div className={styles.cardDate} dangerouslySetInnerHTML={{__html: date}}/>}

                {title && <div className={styles.cardTitle} dangerouslySetInnerHTML={{__html: title}}/>}

                {company && <div className={styles.cardCompagny} dangerouslySetInnerHTML={{__html: company}}/>}

                {content && <div className={styles.cardContent}>{content}</div>}
            </div>
        )
    }

    if(href) {
        return (
            <Link href={href} passHref>
                <a>
                    <ExperienceCardContent/>
                </a>
            </Link>
        )
    }

    return (
        <ExperienceCardContent/>
    )
}

export default ExperienceCards