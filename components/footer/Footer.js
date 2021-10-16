import React from 'react';
import Image from "next/image";
import Svg from "../svg/Svg";

const Footer = ({}) => {

    return (
        <footer className="footer">
            <div className="container">
                <ul className="footer-social-items">
                    <li className="footer-social-item">
                        <a href="https://www.linkedin.com/in/ga%C3%ABtan-boyron-developpeur-web/" rel="noopener">
                            <Svg name="linkedin"/>
                        </a>
                    </li>
                    <li className="footer-social-item">
                        <a href="https://github.com/LeCuistotduWeb" rel="noopener">
                            <Svg name="github"/>
                        </a>
                    </li>
                    <li className="footer-social-item">
                        <a href="https://codepen.io/your-work/" rel="noopener">
                            <Svg name="codepen"/>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default  Footer