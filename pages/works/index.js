import Head from 'next/head'
import styles from '../../styles/layouts/works.module.scss'
import DefaultLayout from "../../layouts/DefaultLayout";

const WorksPage = () => {
    return (
        <DefaultLayout>
            <Head>
                <title>Works</title>
                <meta name="description" content="Works" />
            </Head>

            <main>

                <section>
                    <div className={"container"}>
                        <h1 className="sectionTitle">Works</h1>
                    </div>

                    <div className="container">

                    </div>
                </section>

            </main>

        </DefaultLayout>
    )
}

export default WorksPage