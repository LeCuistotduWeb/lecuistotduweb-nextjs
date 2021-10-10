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

            <div className="container">
                <h1>Titre de mon article</h1>
                <div className="container">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at aut distinctio eius esse est et eum illo, impedit, iusto libero magnam maiores nemo nostrum perferendis quasi quia quidem quo saepe sapiente sint ullam voluptates! Accusantium adipisci eaque enim, fuga nesciunt nobis omnis perspiciatis, repellat repellendus, sapiente sed tempore vero!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deserunt eum exercitationem harum illum laudantium ratione reiciendis repellendus tenetur voluptatem? Accusamus aliquam aspernatur beatae deserunt eos necessitatibus omnis quia rem repellat voluptates! Ad consequatur delectus dicta dignissimos esse et ex exercitationem fuga fugiat in itaque magni natus necessitatibus nesciunt non perspiciatis possimus praesentium, quidem ratione tenetur. Alias ipsa, libero magnam maiores nam quibusdam repudiandae sapiente suscipit? Asperiores corporis enim inventore itaque magni optio, quidem similique sint voluptatem! Asperiores assumenda cum ipsa laudantium nam neque quos? Amet consequatur corporis deleniti dolore ducimus earum enim ex fugit incidunt, inventore laborum libero maxime molestias, odio perferendis placeat porro possimus quaerat quasi quod, quos repellat repellendus soluta tempora vel veritatis voluptate. Atque consectetur cupiditate deserunt eius eligendi error esse est fugiat itaque laboriosam laborum maxime modi odit optio perspiciatis quam quia recusandae reprehenderit repudiandae sit soluta, sunt tempore ullam voluptates voluptatibus. Animi enim fuga in quae tenetur? Assumenda deserunt eos laboriosam, placeat ut voluptatem? Dolorem ducimus eius eum explicabo necessitatibus ratione reiciendis tempore! Accusamus accusantium architecto atque beatae consequatur, delectus eius eligendi harum iste nisi nulla, omnis optio quam quia sunt ullam voluptatem. Illum rem totam ut? Aliquam ea eveniet facilis illum, non tempore.</p>
                </div>
            </div>

        </DefaultLayout>
    )
}

export default StyleguidePage
