import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import IntroductionSection from "../components/homepage/IntroductionSection";
import SkillsSection from "../components/homepage/SkillsSection";
import RandomQuoteSection from "../components/homepage/RandomQuoteSection";
import WorksSection from "../components/homepage/WorksSection";
import ContactSection from "../components/homepage/ContactSection";
import useSWR from 'swr'
import siteConfig from "../siteConfig";

const fetcher = url => fetch(url).then(r => r.json());

const Home = (props) => {

    const { data, error } = useSWR(`/api/works/latest`, fetcher)

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