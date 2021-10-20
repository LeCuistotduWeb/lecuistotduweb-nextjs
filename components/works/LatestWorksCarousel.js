import React from 'react';
import Link from "next/link";

const LatestWorksCarousel = (props) => {
    const {works} = props

    if(!works) return null

    return (
        <div className="works-carousel container">
            <ul className="works-container">
                {works.map((work, index)=>(
                    <li key={index}>
                        <div className="card-works">
                            <Link href={`/works/${work.url}`}>
                                <a>
                                    <img src={work.image} alt={work['image-alt']}/>
                                </a>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LatestWorksCarousel