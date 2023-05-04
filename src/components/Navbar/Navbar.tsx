import React, { FunctionComponent, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar: FunctionComponent = (): ReactElement => {
    return (
        <ul className={styles.NavItems}>
            <li className={styles.NavList}>
                <NavLink to={"/admin"} className={styles.NavLink}>Личный кабинет</NavLink>
            </li>
            <li className={styles.NavList}>
                <NavLink to={"/"} className={`${styles.NavLink} ${styles.NavLink_btn}`}>Поддержка</NavLink>
            </li>
        </ul>
    );
};

export default Navbar;