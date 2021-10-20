import Head from 'next/head'
import DefaultLayout from "../../layouts/DefaultLayout"
import MarkdownContent from "../../components/MarkdownContent";
import TagsList from "../../components/TagsList";
import matter from 'gray-matter'
import fs from 'fs'
import path from "path"

const SingleWorkPage = (props) => {
    const {frontmatter, slug, content,} = props
    const { title, date, image, tags } = frontmatter
    const imageAlt = frontmatter['image-alt'];

    return (
        <DefaultLayout>
            <Head>
                <title>Works slug {slug}</title>
                <meta name="description" content={`Experiences ${slug}`} />
            </Head>

            <main className="container">
                <img src={image} alt={imageAlt}/>
                <h1 className="sectionTitle">works single {title}</h1>
                <MarkdownContent content={content}/>
                <TagsList tags={tags}/>
            </main>

        </DefaultLayout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('./datas/works'))
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('./datas/works', slug + '.md'),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)
    console.log({frontmatter})
    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}

export default SingleWorkPage