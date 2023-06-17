import Head from "next/head";
import DefaultLayout from "../../layouts/DefaultLayout";
import WorkCard from "../../components/cards/WorkCard";
import useSWR from "swr";
import siteConfig from "../../siteConfig";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const WorksPage = ({}) => {
  const worksSectionRef = useRef(null);
  const worksRef = useRef([]);

  const { data, error } = useSWR(`/api/works`, fetcher);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!data || !worksRef) return;
      gsap.from(worksRef.current, {
        duration: 0.3,
        opacity: 0,
        ease: "ease.inOut",
        stagger: {
          amount: 1,
        },
      });
    }, worksSectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <DefaultLayout>
      <Head>
        <title>{siteConfig.title} - Réalisations</title>
        <meta name="description" content="Mes réalisations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container works" ref={worksSectionRef}>
        <h1 className="section-title">Réalisations</h1>
        <ul className="works-container">
          {data &&
            data.map((work, index) => (
              <li
                ref={(el) => (worksRef.current[index] = el)}
                key={index}
              >
                <WorkCard work={work} />
              </li>
            ))}
        </ul>

        <div>
          <p>
            Retrouvez mon parcours et mes diverses experiences{" "}
            <Link href="/experiences">ici</Link>
          </p>
          <p>
            Suivez-moi aussi sur mon{" "}
            <a rel="noopener" href="https://codepen.io/lecuistotduweb">
              Codepen
            </a>
            . Ou sur mon github{" "}
            <a rel="noopener" href="https://github.com/lecuistotduweb">
              LeCuistotduWeb
            </a>
            .
          </p>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default WorksPage;
