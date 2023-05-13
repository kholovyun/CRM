import { FunctionComponent, ReactElement } from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer: FunctionComponent = (): ReactElement => {
    return (
        <div className={styles.Footer_bg}>
            <div className={styles.Footer_content_container}>
                <div className={styles.Footer_flex_column}>
                    <NavLink to={"/"} className={styles.FooterNavlink}>Договор оферты</NavLink>
                    <NavLink to={"/"} className={`${styles.FooterNavlink}`}>Политика конфеденциальности</NavLink>
                </div>
                <div className={styles.Footer_flex_column}>
                    <p className={styles.FooterContactsTitle}>Контакты для связи</p>
                    <div className={styles.icoContactBox}>
                        <div className={`${styles.icoContact} ${styles.icoContactItemInsta}`}></div>
                        <div className={`${styles.icoContact} ${styles.icoContactItemTelegram}`}></div>
                        <div className={`${styles.icoContact} ${styles.icoContactItemWhatsapp}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;