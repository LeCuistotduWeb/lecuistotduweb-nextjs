import React, {useLayoutEffect, useRef} from "react";
import Link from "next/link";
import ProfileSvg from "../profile/Profile";
import { gsap } from "gsap";
import ga from "../../utils/ga";

const gsapBaseAnimation = {
  duration: .5,
  opacity: 0,
  y: 30,
  ease: 'ease.inOut',
}

const IntroductionSection = (props) => {
  const overlineRef = useRef();
  const titleRef = useRef();
  const descriptioneRef = useRef();
  const buttonsRef = useRef()

  useLayoutEffect(()=>{
    let ctx = gsap.context(() => {
        gsap.from(overlineRef.current, { 
            ...gsapBaseAnimation,
        });
        gsap.from(titleRef.current, { 
          ...gsapBaseAnimation,
            delay: .3,
        });
        gsap.from(descriptioneRef.current, { 
            delay: .5,
            ...gsapBaseAnimation,
        });
        gsap.from(buttonsRef.current, { 
          ...gsapBaseAnimation,
            delay: 1,
            y: 10,
        });
    }, overlineRef);
    
    return () => ctx.revert();
  }, [])

  return (
    <section className={"section introduction container"}>
      <div className={"introduction-image"}>
        <ProfileSvg type="default" />
      </div>
      <div className={"introduction-content"}>
        {/*<div>Hello ! Je suis gaëtan Boyron alias</div>*/}
        <p ref={overlineRef} className="subtitle">
          Développeur Front-End
        </p>
        <h1 ref={titleRef} className="section-title">
          LeCuistotduWeb.
        </h1>
        <p ref={descriptioneRef}>
          Bienvenue sur mon portfolio. Je m'appelle{" "}
          <strong>Gaëtan Boyron</strong> (alias LeCuistotduWeb). Animé par
          l’envie de développer ma créativité et de paticiper à la conception du
          web de demain, j’ai décidé de me reconvertir en 2017 afin de vivre de
          ma passion : le développement Web.
        </p>
        <div ref={buttonsRef} className="btns-container">
          <Link href="/experiences" className="btn btn-secondary">
            Mes expériences
          </Link>
          <a
            onClick={() => ga.CVdownloaded()}
            href="/pdf/cv-gaetan-boyron-developpeur-2026.pdf"
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
