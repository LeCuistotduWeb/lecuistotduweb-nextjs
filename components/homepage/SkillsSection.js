import * as React from 'react';
import Image from "next/image";

const SkillsSection = (props) => {

    const sizeLogo = 60;

    return (
        <section className="skills section" id={"skills"}>
            <div className={"container"}>
                <h2 className="section-title">Technologies & Tools</h2>
                <div className="logo-list">
                    <ul>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/html5-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/css3-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/javascript-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/jquery-logo.jpg" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/php-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/mysql-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/npm-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/yarn-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/sass-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/symfony-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/wordpress-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                        <li>
                            <div className="card card-skill">
                                <Image className="logo" width={sizeLogo} height={sizeLogo} src="/images/skills/react-logo.png" alt="logo html 5"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default SkillsSection