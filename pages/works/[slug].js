import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout"
import TagsList from "../../components/TagsList";
import WorksPage from "./index";

const SingleWorkPage = ({work}) => {
    const {content, title, tags, slug} = work

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

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/works`)
    const works = await res.json()
    const paths = works.map((work) => ({
        params: {
            slug: work.slug,
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

SingleWorkPage.getInitialProps = async ({ params: { slug }, res }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/works/${slug}`)
    const work = await response.json()

    if(!work){
        res.statusCode = 404;
        return {
            notFound: true,
        }
    }

    return {
        work
    }
}

export default SingleWorkPage