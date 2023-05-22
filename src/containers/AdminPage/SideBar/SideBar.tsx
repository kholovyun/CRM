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
                        to={"/admin-page/doctors"}>Врачи</NavLink>
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Родители пациентов</NavLink>
                    <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                        <NavLink className={"sidebar_link_"}
                            to={"/admin-page/admins"}>Администраторы</NavLink>
                    </AccessControl>                    
                    <NavLink className={"sidebar_link_"}
                        to={"/admin-page/"}>Отзывы</NavLink>
                </div>
            }
        </>
    );
};

export default SideBar;