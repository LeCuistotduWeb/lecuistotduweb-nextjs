import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout";
import ExperienceCards from "../../components/cards/ExperienceCards";
import Link from "next/link";
import experiencesData from "../../_datas/experiences.json";
import oldExperiencesData from "../../_datas/experiences-old.json";

const WorksPage = () => {
    const experiences = getCardPosition(experiencesData);
    const oldExperiences = getCardPosition(oldExperiencesData);
    return (
      <DefaultLayout>
        <Head>
          <title>Experiences</title>
          <meta name="description" content="Experiences" />
        </Head>
        <main>
          <section>
            <div className="container">
              <h1 className="section-title">Experiences</h1>
            </div>

            <div className="container">
              <div className={"experiencesContainer"}>
                <ul className={"experiencesList"}>
                  {experiences.map((elt, index) =>
                    elt.type === "title" ? (
                      <li key={index} className={"experiencesListTitle"}>
                        <div className={"dateItem"}>{elt.title}</div>
                      </li>
                    ) : (
                      <li key={index} className={"experiencesListItem"}>
                        <ExperienceCards
                          title={elt.title}
                          company={elt.company}
                          date={elt.date}
                          content={elt.content}
                          onRight={elt.position === "right"}
                        />
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="container">
              <h2 className="text-center">Reconversion professionnelle</h2>
              <div className={"experiencesContainer"}>
                <ul className={"experiencesList"}>
                  {oldExperiences.map((elt, index) =>
                    elt.type === "title" ? (
                      <li key={index} className={"experiencesListTitle"}>
                        <div className={"dateItem"}>{elt.title}</div>
                      </li>
                    ) : (
                      <li key={index} className={"experiencesListItem"}>
                        <ExperienceCards
                          title={elt.title}
                          company={elt.company}
                          date={elt.date}
                          content={elt.content}
                          onRight={elt.position === "right"}
                        />
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </section>

          <section className="container">
            <p>
              Retrouvez mes réalisations <Link href="/works">ici</Link>
            </p>
          </section>
        </main>
      </DefaultLayout>
    );
}

export default WorksPage

const getCardPosition = (data) => {
  let itemIndex = 0;
  return data.map((item) => {
    if (item.type !== "title") {
      item.position = itemIndex % 2 === 0 ? "left" : "right";
      itemIndex++;
    }
    return item;
  });
};