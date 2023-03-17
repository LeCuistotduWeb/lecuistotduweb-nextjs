import React from 'react';
import Link from "next/link";
import Image from "next/image";

const WorkCard = ({work}) => {
    return (
        <div className="card-works">
            <Link href={`/works/${work.slug}`} passHref>
                <Image width={350} height={195} src={work.image} alt={work['image-alt']}/>
            </Link>
        </div>
    );
}

export default WorkCard