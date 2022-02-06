import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import IntroductionSection from "../components/homepage/IntroductionSection";
import SkillsSection from "../components/homepage/SkillsSection";
import RandomQuoteSection from "../components/homepage/RandomQuoteSection";
import WorksSection from "../components/homepage/WorksSection";
import ContactSection from "../components/homepage/ContactSection";
import useSWR from 'swr'
import siteConfig from "../siteConfig";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Home = (props) => {

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/works`, fetcher)

    return (
        <DefaultLayout>
            <Head>
                <title>{siteConfig.title}</title>
                <meta name="description" content="Full-stack developer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="homepage">

                <IntroductionSection/>

                <SkillsSection/>

                <WorksSection works={data}/>

                <ContactSection/>

                <RandomQuoteSection/>

            </main>

        </DefaultLayout>
    )
}

export default Home