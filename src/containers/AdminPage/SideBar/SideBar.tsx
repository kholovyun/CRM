import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import "./SideBarNavLink.css";

const SideBar: React.FunctionComponent = (): React.ReactElement => {
    const [isShowingMenu, setIsShowingMenu] = useState(false);

    const toogleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsShowingMenu(!isShowingMenu);
    };

    return (
        <>
            {isShowingMenu ? 
                <div className={styles.sidebar_colappsed}>
                    <div onClick={toogleMenu} 
                        className={styles.open_btn}>
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
                        to={"/admin-page/register-doctor"}>Зарегистрировать Врача</NavLink>
                    <NavLink className={"sidebar_link"} 
                        to={"/admin-page/register-admin"}>Зарегистрировать Администратора</NavLink>
                    <NavLink className={"sidebar_link"}
                        to={"/admin-page/doctors"}>Врачи</NavLink>
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Родители пациентов</NavLink>
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Администраторы</NavLink>
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Отзывы</NavLink>
                </div>
            }
        </>
    );
};

export default SideBar;