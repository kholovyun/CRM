import { FunctionComponent, ReactElement } from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";


const Footer: FunctionComponent = (): ReactElement => {
    return (
        <footer className={styles.Footer}>
            <div className={`${styles.Footer_container} ${styles.container}`}>
                <ul className={styles.Footer_navbar}>
                    <li className={styles.Footer_navlist}>
                        <NavLink to={"/"} className={styles.Footer_navlink}>Договор оферты</NavLink>
                    </li>
                    <li className={styles.NavList}>
                        <NavLink to={"/"} className={`${styles.Footer_navlink}`}>Политика конфеденциальности</NavLink>
                    </li>
                </ul>
                <div className={styles.Footer_contacts}>
                    <p className={styles.Footer_contacts_title}>Контакты для связи</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;