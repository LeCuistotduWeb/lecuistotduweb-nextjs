import * as React from 'react';
import styles from "../../styles/pages/homepage/about.module.scss";
import Link from 'next/link';

const AboutSection = (props) => {
    return (
        <section className={styles.about}>
            <div className={styles.aboutContainer}>
                <h2 className="sectionTitle">Experiences</h2>
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