import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AccessControl from "../../permissionRoutes/AccessControl";
import { NavLink } from "react-router-dom";
import { EBtnClass } from "../../enums/EBtnClass";
import { logout } from "../../features/authSlice";
import { EBtnSize } from "../../enums/EBtnSize";
import style from "../Header/Header.module.css";
import styles from "./MenuBurger.module.css";
import { ERoles } from "../../enums/ERoles";
import { toast } from "react-toastify";
import Btn from "../UI/Btn/Btn";
import { Avatar } from "../UI/Avatar/Avatar";

export const MenuBurger: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const [showMenu, setShowMenu] = useState(false);
    const dispatcher = useAppDispatch();

    const showMenuToogle = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className={styles.menuBurger} onClick={showMenuToogle}>
        &#9776;
            {showMenu && <div className={styles.menuBurgerBox}>
                <div className={styles.closeBox}>
                    <p className={styles.close} onClick={showMenuToogle}>X</p>
                </div>
                {user ?
                    <div className={style.linkBox}>
                        <NavLink style={{maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis",  whiteSpace: "nowrap", marginBottom: "40px", textAlign: "center", fontSize: "1rem"}} to={user.role === ERoles.ADMIN || user.role === ERoles.SUPERADMIN ?
                            "/admin-page"
                            : user.role === ERoles.DOCTOR ? `/doctor-cabinet/:${user.id}` : "/"
                        } className={style.header_link}>
                            <strong>{user.name}</strong>
                        </NavLink>
                        <Avatar style={{margin: "0px 0px 40px 10px"}} link="login"/>
                    </div> :
                    <div className={style.linkBox}>
                        <NavLink style={{whiteSpace: "nowrap", marginRight: "5px", marginBottom: "40px", textAlign: "center", fontSize: "1rem"}} to={"/login"} className={style.header_link}>
                            Личный кабинет
                        </NavLink>
                        <Avatar style={{marginBottom: "40px"}} link="login"/>
                    </div>
                }
                <Btn
                    style={{marginBottom: "40px"}}
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
            }
        </div>
    );
};
