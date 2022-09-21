import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout"
import TagsList from "../../components/TagsList";
import { useRouter } from 'next/router'
import useSWR from "swr";
import siteConfig from "../../siteConfig";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const SingleWorkPage = (props) => {
    const router = useRouter()
    const { slug } = router.query
    const { data, error } = useSWR(`/api/works/${slug}`, fetcher)

    // const {content, title, tags} = data
    if (!data || error) return null;

    return (
        <DefaultLayout>
            <Head>
                <title>{siteConfig.title} - {data.title}</title>
                <meta name="description" content={`Experiences ${data.slug}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container">
                <h1 className="sectionTitle">{data.title}</h1>
                <div dangerouslySetInnerHTML={{__html: data.content}}/>
                {data.tags && <TagsList tags={data.tags}/>}
            </main>

        </DefaultLayout>
    )
}

export default SingleWorkPage