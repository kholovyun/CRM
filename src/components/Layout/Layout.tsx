import { FunctionComponent, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const Layout: FunctionComponent = (): ReactElement => {

    return (
        <>
            <div className={styles.Layout}>
                <Header />
                <main className={styles.layoutContainer}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>

    );
};

export default Layout;