import { FunctionComponent, ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnClass } from "../../enums/EBtnClass";

const Header: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <header className={styles.header_bg_container}>
            <div className={styles.header_content_container}>

                <div className={styles.header_logo_box}>
                    <Logo />
                </div>                    
                <nav className={styles.header_links_row}>
                    <div className={styles.flex_row}>
                        {user && 
                            <NavLink to={"cabinet/"} className={styles.header_link}>
                            Личный кабинет: <strong>{user.name}</strong>
                            </NavLink>
                        }
                        <div className={styles.header_avatar_box}>
                            <div className={styles.header_avatar_img}></div>
                        </div>
                        <Btn 
                            title="Поддержка" 
                            onclick={() => toast.info("Функционал пока недоступен")}
                            size={EBtnSize.small} 
                            btnClass={EBtnClass.dark_active}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;