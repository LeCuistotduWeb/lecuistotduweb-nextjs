import * as React from 'react';
import Link from 'next/link';
import LatestWorksCarousel from '../works/LatestWorksCarousel'

const WorksSection = ({}) => {
    return (
        <section className="works-section section">
            <div className="container">
                <h2 className="section-title">Experiences</h2>
                <div className="work-content">
                    <p>Vous voulez en savoir plus sur les différentes expériences professionnel et formations que je mène et celle que j'ai pu mener.</p>
                    <Link href="/experiences" passHref>
                        <a>Mes expériences</a>
                    </Link>
                </div>
            </div>
            <div className="latest-works-carousel-container">
                <LatestWorksCarousel/>
            </div>
        </section>
    )
}

export default WorksSection