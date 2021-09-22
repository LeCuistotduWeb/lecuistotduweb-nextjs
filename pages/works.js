import Head from 'next/head'
import styles from '../styles/layouts/works.module.scss'
import DefaultLayout from "../layouts/DefaultLayout";

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

                  {/*<div className={"container"}>*/}
                  {/*    <div className={styles.worksContainer}>*/}
                  {/*        <ul className={styles.worksList}>*/}
                  {/*            {[1,2,3].map(elt=>(*/}
                  {/*                <li className={styles.worksListItem}>*/}
                  {/*                <div className={styles.card}>*/}
                  {/*                    <div className={styles.cardTtitle}>cart title</div>*/}
                  {/*                    <div className={styles.cardContent}>this is the cart content</div>*/}
                  {/*                    <div className={styles.cardDate}>2016 - 2018</div>*/}
                  {/*                </div> */}
                  {/*            </li>*/}
                  {/*            ))}*/}
                  {/*        </ul>*/}
                  {/*    </div>*/}
                  {/*</div>*/}

                  <div className={styles.timeline}>
                      <div className={styles.timelineComponent}>
                          <div className={`${styles.timelineDate} ${styles.timelineDateRight}`}>2001</div>
                      </div>
                      <div className={styles.timelineMiddle}>
                          <div className={styles.timelinePoint}></div>
                      </div>
                      <div className={`${styles.timelineComponent} ${styles.timelineComponentBg}`}>
                          <h2 className={styles.timelineTitle}>The beggining</h2>
                          <p className={styles.timelineParagraph}>
                              RIETE is set up in 2001 with 25 Spanish physicians participating in sharing the data of
                              their patients in a single database.
                          </p>
                      </div>

                      <div className={`${styles.timelineComponent} ${styles.timelineComponentBg}`}>
                          <h2 className={styles.timelineTitle}>The first article</h2>
                          <p className={styles.timelineParagraph}>
                              We publish our first original article, at <span className="titol">
                              <a href="https://pubmed.ncbi.nlm.nih.gov/15529451/">The New England Journal of Medicine</a></span>.
                          </p>
                      </div>

                      <div className={styles.timelineMiddle}>
                          <div className={styles.timelinePoint}></div>
                      </div>
                  </div>
              </section>

          </main>

      </DefaultLayout>
  )
}

export default WorksPage
