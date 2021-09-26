import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout"

const WorksPage = () => {
    return (
        <DefaultLayout>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact" />
            </Head>

            <main>

                <section>
                    <div className={"container"}>
                        <h1 className="sectionTitle">Contact</h1>
                    </div>

                    <div className="container">
                        formulaire de contact
                    </div>
                </section>

            </main>

        </DefaultLayout>
    )
}

export default WorksPage