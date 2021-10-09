import * as React from 'react';
import Image from "next/image";
import Link from "next/link";

const IntroductionSection = (props) => {
    return (
        <section className={"introduction container"}>
            <div className={"introduction-content"}>
                <h1 className={"title"}>I'm LeCuistotduWeb.</h1>
                <p>Animé par l’envie de travailler en équipe et de développer ma créativité au quotidien, j’ai commencé mon chemin professionnel dans l’univers de la restauration. Si ces valeurs sont toujours primordiales pour moi, j’ai aujourd’hui décidé de me reconvertir et de vivre de ma passion : le développement web.</p>
                <Link href="/experiences" passHref>
                    <a>mes expériences</a>
                </Link>
            </div>
            <div className={"introduction-image"}>
                <Image width={350} height={350} src="/images/profile.jpg" alt="photo développeur web LeCuistotduWeb"/>
            </div>
        </section>
    )
}

export default IntroductionSection