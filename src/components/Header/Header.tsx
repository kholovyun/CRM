import { FunctionComponent, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnClass } from "../../enums/EBtnClass";
import { logout } from "../../features/authSlice";
import { ERoles } from "../../enums/ERoles";
import AccessControl from "../../permissionRoutes/AccessControl";

const Header: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const dispatcher = useAppDispatch();

    return (
        <header className={styles.header_bg_container}>
            <div className={styles.header_content_container}>

                <div className={styles.header_logo_box} >
                    <Logo />
                </div>
                <nav className={styles.header_links_row}>
                    <div className={styles.right_flex_row}>
                        {user &&
                            <NavLink to={user.role === ERoles.ADMIN || user.role === ERoles.SUPERADMIN ? 
                                "/admin-page" 
                                : user.role === ERoles.DOCTOR ? `/doctor-cabinet/:${user.id}` : "/"
                            } className={styles.header_link}>
                                Личный кабинет: <strong>{user.name}</strong>
                            </NavLink>
                        }
                        <div className={styles.header_avatar_box}>
                            <div className={styles.header_avatar_img}></div>
                        </div>                        
                    </div>
                    <div className={styles.flex_row}>
                        <Btn
                            title="Поддержка"
                            onclick={() => toast.info("Функционал пока недоступен")}
                            size={EBtnSize.small}
                            btnClass={EBtnClass.dark_active}
                        />
                        <AccessControl
                            allowedRoles={[ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT, ERoles.SUPERADMIN]}
                        >
                            <Btn 
                                title={"Выйти"} 
                                size={EBtnSize.small}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => dispatcher(logout())} />
                        </AccessControl>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;