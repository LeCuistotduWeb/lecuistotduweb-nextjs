import Head from 'next/head'
import styles from '../styles/layouts/home.module.css'
import DefaultLayout from "../layouts/DefaultLayout";
import IntroductionSection from "../components/homepage/IntroductionSection";
import SkillsSection from "../components/homepage/SkillsSection";
import Link from 'next/link';

const Home = () => {
  return (
      <DefaultLayout>
          <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>

              <IntroductionSection/>

              <SkillsSection/>

              <section className={styles.about}>
                  <div className={"container"}>
                      <h2 className="sectionTitle">Works & Experiences</h2>
                      <div className="text-center">
                      <Link href="works" passHref>
                          <a>Voir</a>
                      </Link>
                      </div>
                  </div>
              </section>

          </main>

      </DefaultLayout>
  )
}

export default Home
