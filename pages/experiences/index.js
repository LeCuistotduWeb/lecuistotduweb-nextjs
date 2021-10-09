import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout";
import ExperienceCards from "../../components/cards/ExperienceCards";

const experiencesData = [
    {
        id: 0,
        type: "title",
        title: "2018",
    },
    {
        id: 1,
        type: "card",
        date: "2018 / 2019 (octobre-avril)",
        title: "Stagiaire développeur web -",
        company: "Nomad Education (Paris)",
        content: <>
            <ul>
                <li>
                    - Refonte du site vitrine.
                </li>
                <li>
                    - Aide au développement de nouvelles fonctionnalités sur
                </li>
            </ul>
        </>
    },
    {
        id: 2,
        type: "title",
        title: "2017",
    },
    {
        id: 3,
        type: "card",
        date: "2017 / Ajourd’hui",
        title: "Développeur fullstack / Webdesigner",
        company: "lepoudrierdefleur.fr",
        content: <>
            <ul>
                <li>
                    - Maintenance du site Web.
                </li>
                <li>
                    - Développement de nouvelles fonctionnalités
                </li>
                <li>
                    - Montage vidéos, retouches photos, créations de visuels
                </li>
            </ul>
        </>
    },
    {
        id: 4,
        type: "card",
        date: "2017 (mai-juin)",
        title: "Stagiaire webdesigner",
        company: "Arkade Communication (Valence, Drôme)",
        content: <>
            <ul>
                <li>
                    - Amelioration d’UX/UI de site-Web.
                </li>
                <li>
                    - Correction de bugs d’un site basé sous Wordpress.
                </li>
                <li>
                    - Covering de vehicule utilitaire.
                </li>
            </ul>
        </>
    },
    {
        id: 5,
        type: "title",
        title: "2015",
    },
    {
        id: 6,
        type: "card",
        date: "2015 / 2016",
        title: "Conducteur de machine de conditionnement en agroalimentaire",
        company: "Société Charles & Alice (Alex, Drôme)",
        content: <>
            <ul>
                <li>
                    - Respect des enjeux de productivité, qualité, hygiène et
                    sécurité.
                </li>
                <li>
                    - Contrôle, diagnostique et communication des pannes.
                </li>
                <li>
                    - Proposition d’améliorations du fonctionnement de la ligne.
                </li>
            </ul>
        </>
    },
    {
        id: 7,
        type: "title",
        title: "2013",
    },
    {
        id: 8,
        type: "card",
        date: "2013",
        title: "Chef de restauration",
        company: "école municipale (Vaulx, Haute Savoie)",
        content: <>
            <ul>
                <li>
                    - Élaboration des menus.
                </li>
                <li>
                    - Gestion des stocks.
                </li>
                <li>
                    - Relations fournisseurs.
                </li>
            </ul>
        </>
    }
]

const WorksPage = (props) => {
    const {} = props
    const [data, setData] = useState(experiencesData);

    const getCardPosition = () => {
        let newData = [...data]
        let cpt = 0;
        for (let index = 0; index < newData.length; index++) {
            let elt = newData[index]
            if(elt.type === 'card'){
                elt.position = cpt % 2 ? 'right' : 'left'
                cpt++
            }
        }
        setData(newData)
    }

    useEffect(() => {
        getCardPosition()
    }, []);

    return (
        <DefaultLayout>
            <Head>
                <title>Experiences</title>
                <meta name="description" content="Experiences" />
            </Head>

            <main>

                <section>
                    <div className={"container"}>
                        <h1 className="sectionTitle">Experiences</h1>
                    </div>

                    <div className={"container"}>
                        <div className={"experiencesContainer"}>
                            <ul className={"experiencesList"}>
                                {data.map((elt, index) => (
                                    elt.type === 'title' ? (
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
                                                onRight={elt.position === 'right'}
                                            />
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>

                </section>

            </main>

        </DefaultLayout>
    )
}

export default WorksPage