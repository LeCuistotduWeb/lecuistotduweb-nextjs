import React from 'react';
import styles from "../../styles/modules/footer.module.scss";
import Link from "next/link";
import SwitchTheme from "./SwitchTheme";

const Footer = (props) => {

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.bloc1}>
                  <ul>
                      <li>
                          <Link href="/works">
                              Works
                          </Link>
                      </li>
                      <li>
                          <Link href="/contact">
                              Contact
                          </Link>
                      </li>
                      <li>
                          <a href="https://lecuistotduweb.fr">
                              Powered by LecuistotduWeb
                          </a>
                      </li>
                  </ul>
                </div>
                <div className={styles.bloc2}>
                    <strong>A propos :</strong>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                    <SwitchTheme/>
                </div>
            </div>
        </footer>
    );
};

export default  Footer