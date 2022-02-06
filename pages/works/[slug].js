import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout"
import TagsList from "../../components/TagsList";
import { useRouter } from 'next/router'
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const SingleWorkPage = (props) => {
    const router = useRouter()
    const { slug } = router.query
    const { data, error } = useSWR(`/api/works/${slug}`, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const {content, title, tags} = data

    return (
        <DefaultLayout>
            <Head>
                <title>Works slug {slug}</title>
                <meta name="description" content={`Experiences ${slug}`} />
            </Head>

            <main className="container">
                <h1 className="sectionTitle">works single {title}</h1>
                <div dangerouslySetInnerHTML={{__html: content}}/>
                <TagsList tags={tags}/>
            </main>

        </DefaultLayout>
    )
}

export default SingleWorkPage