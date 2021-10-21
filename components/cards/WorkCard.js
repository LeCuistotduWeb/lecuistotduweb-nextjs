import React from 'react';
import Link from "next/link";

const WorkCard = ({work}) => {

    console.log({work})

    return (
        <div className="card-works">
            <Link href={`/works/${work.slug}`}>
                <a>
                    <img src={work.image} alt={work['image-alt']}/>
                </a>
            </Link>
        </div>
    );
}

export default WorkCard