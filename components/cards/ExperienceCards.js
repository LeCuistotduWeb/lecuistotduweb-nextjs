import React, {} from 'react';
import Link from "next/link";

const ExperienceCards = (props) => {

    const {title, company, content, href="", date, onRight=false, logo} = props

    const ExperienceCardContent = () => {
        return (
            <div className={`${"card"} ${onRight ? "cardRight" : "cardLeft"}`}>
                {logo && <img className={"cardLogo"} src={logo} alt={title}/>}

                {date && <div className={"cardDate"} dangerouslySetInnerHTML={{__html: date}}/>}

                {title && <div className={"cardTitle"} dangerouslySetInnerHTML={{__html: title}}/>}

                {company && <div className={"cardCompagny"} dangerouslySetInnerHTML={{__html: company}}/>}

                {content && <div className={"cardContent"}>{content}</div>}
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