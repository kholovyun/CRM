import { FunctionComponent, ReactElement } from "react";
import { Container } from "../UI/Container/Container";
import styles from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
import Logo from "../Logo/Logo";

const Header: FunctionComponent = (): ReactElement => {
    return (
        <header>
            <Container>
                <div className={styles.Header_container}>
                    <Logo />
                    <Navbar />
                </div>
            </Container>
        </header>
    );
};

export default Header;