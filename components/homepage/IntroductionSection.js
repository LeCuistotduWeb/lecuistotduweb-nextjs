import * as React from "react";
import Link from "next/link";
import ProfileSvg from "../profile/Profile";
import { motion } from "framer-motion";

const IntroductionSection = (props) => {
  return (
    <section className={"introduction container section"}>
      <div className={"introduction-image"}>
        <ProfileSvg type="default" />
      </div>
      <div className={"introduction-content"}>
        {/*<div>Hello ! Je suis gaëtan Boyron alias</div>*/}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0,
          }}
          className="subtitle"
        >
          Développeur Front-End
        </motion.p>
        <h1 className="section-title">LeCuistotduWeb.</h1>
        <p>
          Bienvenue sur mon portfolio. Je m'appelle{" "}
          <strong>Gaëtan Boyron</strong> (alias LeCuistotduWeb). Animé par
          l’envie de développer ma créativité et de paticiper à la conception du
          web de demain, j’ai décidé de me reconvertir en 2017 afin de vivre de
          ma passion : le développement Web.
        </p>
        <div className="btns-container">
          <Link href="/experiences" passHref>
            <a className="btn btn-secondary">Mes expériences</a>
          </Link>
          <a
            href="/pdf/cv-2022.pdf"
            className="btn"
            target="_blank"
          >
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
