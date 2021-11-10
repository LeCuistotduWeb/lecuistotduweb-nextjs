import React, {useRef,useEffect} from 'react';
import WorkCard from "../cards/WorkCard";

const LatestWorksCarousel = (props) => {
    const {works} = props

    if(!works) return null
    return (
        <div className="carousel works-carousel">
            <ul className="works-container carousel-list">
                {works.map((work, index)=>(
                    <li key={index} className="carousel-list-item">
                        <WorkCard work={work}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LatestWorksCarousel