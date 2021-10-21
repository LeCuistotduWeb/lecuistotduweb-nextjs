import React from 'react';
import WorkCard from "../cards/WorkCard";

const LatestWorksCarousel = (props) => {
    const {works} = props

    if(!works) return null

    return (
        <div className="works-carousel container">
            <ul className="works-container">
                {works.map((work, index)=>(
                    <li key={index}>
                        <WorkCard work={work}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LatestWorksCarousel