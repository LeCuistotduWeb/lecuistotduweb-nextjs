import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import IntroductionSection from "../components/homepage/IntroductionSection";
import SkillsSection from "../components/homepage/SkillsSection";
import RandomQuoteSection from "../components/homepage/RandomQuoteSection";
import WorksSection from "../components/homepage/WorksSection";

const Home = ({works}) => {

  return (
      <DefaultLayout>
          <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="homepage">
              <IntroductionSection/>

              <SkillsSection/>

              <WorksSection works={works}/>

              <RandomQuoteSection/>
          </main>

      </DefaultLayout>
  )
}

export async function getStaticProps(ctx) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/works`)
    const works = await res.json()
    return {
        props: {
            works,
        }
    }
}

export default Home
