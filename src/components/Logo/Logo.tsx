import { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useAppSelector } from "../../app/hooks";


const Logo: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <Link className={styles.Logo} to={user ? "/login" : "/"} />
    );
};

export default Logo;