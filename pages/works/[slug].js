import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout"
import MarkdownContent from "../../components/MarkdownContent";
import TagsList from "../../components/TagsList";
import matter from 'gray-matter'

const SingleWorkPage = (props) => {
    const {slug, content, data} = props

    return (
        <DefaultLayout>
            <Head>
                <title>Works slug {slug}</title>
                <meta name="description" content={`Experiences ${slug}`} />
            </Head>

            <main>

                <div style={{margin: '90px auto'}} className={"container"}>
                    <h1 className="sectionTitle">works single {data.title}</h1>
                    <MarkdownContent content={content}/>
                    <TagsList tags={data.tags}/>
                </div>

            </main>

        </DefaultLayout>
    )
}

SingleWorkPage.getInitialProps = async (context) => {
    const { slug } = context.query
    const content = await import(`../../data/works/seconde-chance.md`)
    const data = matter(content.default)
    return {
        ...data,
        slug
    }
}

export default SingleWorkPage