import { FunctionComponent, ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/Button/Button";
import styles from "./Navbar.module.css";

const Navbar: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const navigator = useNavigate();

    return (
        <div className={styles.NavItems}>
            {user && <Button name={`Личный кабинет: ${user.name}`} onclick={() => navigator("/cabinet")} />}
            <Button name="Поддержка" onclick={() => navigator("/")} />
        </div>
    );
};

export default Navbar;