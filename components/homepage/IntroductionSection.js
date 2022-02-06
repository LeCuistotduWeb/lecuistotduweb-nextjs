import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import ProfileSvg from "../profile/Profile";

const IntroductionSection = (props) => {
    return (
        <section className={"introduction container section"}>
            <div className={"introduction-image"}>
                <ProfileSvg type="default" />
            </div>
            <div className={"introduction-content"}>
                {/*<div>Hello ! Je suis gaëtan Boyron alias</div>*/}
                <p className="subtitle">Développeur Front-End</p>
                <h1 className="section-title">LeCuistotduWeb.</h1>
                <p>Animé par l’envie de travailler en équipe et de développer ma créativité au quotidien, j’ai commencé mon chemin professionnel dans l’univers de la restauration. Si ces valeurs sont toujours primordiales pour moi, j’ai aujourd’hui décidé de me reconvertir et de vivre de ma passion : le développement web.</p>
                <div>
                    <Link href="/experiences" passHref>
                        <a className="btn btn-secondary">Mes expériences</a>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default IntroductionSection