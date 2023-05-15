import { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";


const Logo: FunctionComponent = (): ReactElement => {
    return (
        <Link className={styles.Logo} to={"/admin"} />
    );
};

export default Logo;