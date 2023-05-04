import React, { FunctionComponent, ReactElement } from "react";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";


const Header: FunctionComponent = (): ReactElement => {
    return (
        <header className={styles.Header}>
            <div className={`${styles.Header_container} ${styles.container}`}>
                <div className={styles.Logo_block}>
                    <Logo />
                </div>
                <div className={styles.Nav_block}>
                    <Navbar />
                </div>
            </div>
        </header>
    );
};

export default Header;