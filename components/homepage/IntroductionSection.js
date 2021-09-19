import * as React from 'react';
import styles from "../../styles/layouts/Home.module.css";

const IntroductionSection = (props) => {
    return (
        <section className={styles.introduction}>
            <div className={"container"}>
                <div className={styles.grid2}>
                    <div className={styles.introductionContent}>
                        <h1 className={"title"}>
                            Hello everyone! <br/>
                            I'm LeCuistotduWeb.
                        </h1>
                        <p>Animé par l’envie de travailler en équipe et de développer ma créativité au quotidien, j’ai commencé mon chemin professionnel dans l’univers de la restauration. Si ces valeurs sont toujours primordiales pour moi, j’ai aujourd’hui décidé de me reconvertir et de vivre de ma passion : le développement web.</p>
                    </div>
                    <div className={styles.introductionImage}>
                        <img width={350} src="https://lecuistotduweb.github.io/assets/images/gaetan-boyron-profile.jpg" alt="photo développeur web LeCuistotduWeb"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntroductionSection