import { FunctionComponent, ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";



const Navbar: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <ul className={styles.NavItems}>
            {user && <li className={styles.cabinetLink}>
                <NavLink to={"/cabinet"} >Личный кабинет: {user.name}</NavLink>
            </li>
            }
            <li className={styles.NavLink_btn}>
                <NavLink to={"/"}>Поддержка</NavLink>
            </li>
        </ul>
    );
};

export default Navbar;