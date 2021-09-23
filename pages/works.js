import Head from 'next/head'
import styles from '../styles/layouts/works.module.scss'
import DefaultLayout from "../layouts/DefaultLayout";
import WorkCards from "../components/cards/WorkCards";

const WorksPage = () => {
  return (
      <DefaultLayout>
          <Head>
              <title>Works</title>
              <meta name="description" content="Mon experience" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>

              <section>
                  <div className={"container"}>
                      <h2 className="sectionTitle">Works & experiences</h2>
                  </div>

                  <div className={"container"}>
                      <div className={styles.worksContainer}>
                          <ul className={styles.worksList}>

                              <li className={styles.worksListDateItem}>
                                  <div className={styles.dateItem}>2020</div>
                              </li>

                              {[1,2,3,4,5,6].map((elt, index) =>(
                                  <li className={styles.worksListItem}>
                                  <WorkCards title="" content="" href="" onRight={index % 2} />
                              </li>
                              ))}

                              <li className={styles.worksListDateItem}>
                                  <div className={styles.dateItem}>2016</div>
                              </li>

                              {[1,2,3,4].map((elt, index) =>(
                                  <li className={styles.worksListItem}>
                                      <WorkCards title="" content="" href="" onRight={index % 2} />
                                  </li>
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
