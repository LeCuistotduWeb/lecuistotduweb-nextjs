import * as React from 'react';
import Link from 'next/link';

const AboutSection = (props) => {
    return (
        <section className={"about"}>
            <div className={"container"}>
                <h2 className="section-title">Experiences</h2>
                <div className="text-center" style={{margin: '30px 0'}}>
                    <p>Vous voulez en savoir plus sur les différentes expériences professionnel et formations que je mène et celle que j'ai pu mener.</p>
                    <Link href="/experiences" passHref>
                        <a>mes expériences</a>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutSection