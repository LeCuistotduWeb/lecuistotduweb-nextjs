import React from 'react';
import Image from "next/image";

const LatestWorksCarousel = (props) => {

    const {} = props

    return (
        <div className="works-carousel container">
            <ul className="works-container">
                {[1,2,3,4,5,6].map((work, index)=>(
                    <li key={index}>
                        <div className="card-works">
                            <img src="/images/works/thumbnail-worksite-web-nomad-education.jpg" alt=""/><img src="" alt=""/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LatestWorksCarousel