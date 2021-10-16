import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import IntroductionSection from "../components/homepage/IntroductionSection";
import ExperienceCards from "../components/cards/ExperienceCards";
import ProfileSvg from "../components/profile/Profile";

const StyleguidePage = () => {
    return (
        <DefaultLayout>
            <Head>
                <title>Styleguide</title>
                <meta name="description" content="Styleguide page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main >
                <div className="container section">
                    <h2>Typographies</h2>
                    <hr/>
                    <h1>Title h1</h1>
                    <h2>Title h1</h2>
                    <h3>Title h3</h3>
                    <h4>Title h4</h4>
                    <h5>Title h4</h5>
                    <h6>Title h</h6>
                </div>

                <div className="container section">
                    <h1>Titre de mon article</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at aut distinctio eius esse est et eum illo, impedit, iusto libero magnam maiores nemo nostrum perferendis quasi quia quidem quo saepe sapiente sint ullam voluptates! Accusantium adipisci eaque enim, fuga nesciunt nobis omnis perspiciatis, repellat repellendus, sapiente sed tempore vero!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deserunt eum exercitationem harum illum laudantium ratione reiciendis repellendus tenetur voluptatem? Accusamus aliquam aspernatur beatae deserunt eos necessitatibus omnis quia rem repellat voluptates! Ad consequatur delectus dicta dignissimos esse et ex exercitationem fuga fugiat in itaque magni natus necessitatibus nesciunt non perspiciatis possimus praesentium, quidem ratione tenetur. Alias ipsa, libero magnam maiores nam quibusdam repudiandae sapiente suscipit? Asperiores corporis enim inventore itaque magni optio, quidem similique sint voluptatem! Asperiores assumenda cum ipsa laudantium nam neque quos? Amet consequatur corporis deleniti dolore ducimus earum enim ex fugit incidunt, inventore laborum libero maxime molestias, odio perferendis placeat porro possimus quaerat quasi quod, quos repellat repellendus soluta tempora vel veritatis voluptate. Atque consectetur cupiditate deserunt eius eligendi error esse est fugiat itaque laboriosam laborum maxime modi odit optio perspiciatis quam quia recusandae reprehenderit repudiandae sit soluta, sunt tempore ullam voluptates voluptatibus. Animi enim fuga in quae tenetur? Assumenda deserunt eos laboriosam, placeat ut voluptatem? Dolorem ducimus eius eum explicabo necessitatibus ratione reiciendis tempore! Accusamus accusantium architecto atque beatae consequatur, delectus eius eligendi harum iste nisi nulla, omnis optio quam quia sunt ullam voluptatem. Illum rem totam ut? Aliquam ea eveniet facilis illum, non tempore.</p>
                </div>

                <div className="container section">
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

                <div className="container section">
                    <h2>Button</h2>
                    <hr/>
                    <a href="#" className="btn btn-primary">btn-primary</a>
                    <a href="#" className="btn btn-secondary">btn-secondary</a>
                    <div type="button" className="btn btn-rounded">
                        <svg width={24} viewBox="0 0 24 24" role="img"><title>Settings icon</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" fill="var(--color)"></path><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" fill="var(--color)"></path></svg>
                    </div>
                </div>

                <div className="container section">
                    <h2>Profile SVG</h2>
                    <hr/>
                    <ProfileSvg/>
                </div>
            </main>

        </DefaultLayout>
    )
}

export default StyleguidePage
