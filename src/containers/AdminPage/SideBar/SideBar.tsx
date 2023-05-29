import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import "./SideBarNavLink.css";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../enums/ERoles";

const SideBar: React.FunctionComponent = (): React.ReactElement => {
    const [isShowingMenu, setIsShowingMenu] = useState(false);

    const toogleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsShowingMenu(!isShowingMenu);
    };

    return (
        <>
            {isShowingMenu ? 
                <div className={styles.sidebar_colappsed_icons_column}>
                    <div className={styles.sidebar_colappsed}>
                        <div onClick={toogleMenu} 
                            className={styles.open_btn}>
                        </div>
                    </div>
                    <div className={styles.sidebar_colappsed}>
                        <NavLink className={"icon doctors_icon"}
                            to={"/admin-page/doctors"}></NavLink>
                    </div>
                    <div className={styles.sidebar_colappsed}>
                        <NavLink className={"icon parents_icon"}
                            to={"/admin-page/"}></NavLink>
                    </div>
                    <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                        <div className={styles.sidebar_colappsed}>
                            <NavLink className={"icon admins_icon"}
                                to={"/admin-page/admins"}></NavLink>
                        </div>
                        <div className={styles.sidebar_colappsed}>
                            <NavLink className={"icon statistics_icon"}
                                to={"/admin-page/"}></NavLink>
                        </div>
                    </AccessControl>
                    <div className={styles.sidebar_colappsed}>
                        <NavLink className={"icon reviews_icon"}
                            to={"/admin-page/"}></NavLink>
                    </div>
                    <div className={styles.sidebar_colappsed}>
                        <NavLink className={"icon admin_profile_icon"}
                            to={"/admin-page/profile"}></NavLink>
                    </div>
                </div>
                :
                <div className={styles.sidebar}>
                    <div className={styles.header_menu_row}>
                        <h3 className={styles.menu_text}>Меню</h3>
                        <div onClick={toogleMenu} 
                            className={styles.close_btn}>
                        </div>
                    </div>
                    <NavLink className={"sidebar_link"}
                        to={"/admin-page/doctors"}>Врачи</NavLink>
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Родители пациентов</NavLink>
                    <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                        <NavLink className={"sidebar_link_"}
                            to={"/admin-page/admins"}>Администраторы</NavLink>
                        <NavLink className={"sidebar_link_"}
                            to={"/admin-page/"}>Статистика</NavLink>
                    </AccessControl>                    
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Отзывы</NavLink>
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/profile"}>Мой профиль</NavLink>
                </div>
            }
        </>
    );
};

export default SideBar;