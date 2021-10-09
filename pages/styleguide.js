import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import IntroductionSection from "../components/homepage/IntroductionSection";
import ExperienceCards from "../components/cards/ExperienceCards";

const StyleguidePage = () => {
    return (
        <DefaultLayout>
            <Head>
                <title>Styleguide</title>
                <meta name="description" content="Styleguide page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main >
                <div className="container">
                    <h2>Typographies</h2>
                    <hr/>
                    <h1>Title h1</h1>
                    <h2>Title h1</h2>
                    <h3>Title h3</h3>
                    <h4>Title h4</h4>
                    <h5>Title h4</h5>
                    <h6>Title h</h6>

                    <br/>

                    <h1>Title h1</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dignissimos, dolore nemo reiciendis sed tempora.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dignissimos, dolore nemo reiciendis sed tempora.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dignissimos, dolore nemo reiciendis sed tempora.</p>
                </div>

                <div className="container">
                    <h2>Colors:</h2>
                    <hr/>

                    <div style={{display: "flex"}}>
                        <div style={{backgroundColor: "var(--red)",width: '15px', height: '150px'}} className="card"></div>
                        <div style={{backgroundColor: "var(--green)",width: '15px', height: '150px'}} className="card"></div>
                        <div style={{backgroundColor: "var(--yellow)",width: '15px', height: '150px'}} className="card"></div>
                        <div style={{backgroundColor: "var(--blue)",width: '15px', height: '150px'}} className="card"></div>
                        <div style={{backgroundColor: "var(--color)",width: '15px', height: '150px'}} className="card"></div>
                        <div style={{backgroundColor: "var(--color-light)",width: '15px', height: '150px'}} className="card"></div>
                        <div style={{backgroundColor: "var(--border-color)",width: '15px', height: '150px'}} className="card"></div>
                    </div>
                </div>
            </main>

        </DefaultLayout>
    )
}

export default StyleguidePage
