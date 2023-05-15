import * as React from 'react';
import Link from 'next/link';
import LatestWorksCarousel from '../works/LatestWorksCarousel'

const WorksSection = ({works}) => {
    return (
        <section className="works-section section">
            <div className="container">
                <h2 className="section-title">Réalisations</h2>
                <div className="work-content">
                    <p>Vous voulez en savoir plus sur les différentes expériences professionnelles et formations que je mène et celle que j'ai pu mener ?</p>
                    <Link href="/works" className="btn btn-secondary">Mes réalisations</Link>
                </div>
            </div>
            <div className="latest-works-carousel-container">
                <LatestWorksCarousel works={works}/>
            </div>
        </section>
    )
}

export default WorksSection