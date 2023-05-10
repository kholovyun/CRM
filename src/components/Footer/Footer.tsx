import { FunctionComponent, ReactElement } from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import { Container } from "../UI/Container/Container";


const Footer: FunctionComponent = (): ReactElement => {
    return (
        <footer>
            <Container>
                <div className={styles.Footer_container}>
                    <ul className={styles.Footer_navbar}>
                        <li className={styles.FooterNavlist}>
                            <NavLink to={"/"} className={styles.FooterNavlink}>Договор оферты</NavLink>
                        </li>
                        <li className={styles.FooterNavlist}>
                            <NavLink to={"/"} className={`${styles.FooterNavlink}`}>Политика конфеденциальности</NavLink>
                        </li>
                    </ul>
                    <div className={styles.Footer_contacts}>
                        <p className={styles.FooterContactsTitle}>Контакты для связи</p>
                        <div className={styles.icoContactBox}>
                            <div className={`${styles.icoContact} ${styles.icoContactItemInsta}`}></div>
                            <div className={`${styles.icoContact} ${styles.icoContactItemTelegram}`}></div>
                            <div className={`${styles.icoContact} ${styles.icoContactItemWhatsapp}`}></div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;