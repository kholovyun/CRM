import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import "./SideBarNavLink.css";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../enums/ERoles";
import { SideBarLinksArray } from "./SideBarLinksArray";

const SideBar: FunctionComponent = (): ReactElement => {
    const [isShowingMenu, setIsShowingMenu] = useState(false);

    const toogleMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsShowingMenu(!isShowingMenu);
    };

    return (
        <>
            {isShowingMenu ? (
                <div className={styles.sidebar_colappsed_icons_column}>
                    <div className={styles.sidebar_colappsed}>
                        <div onClick={toogleMenu} className={styles.open_btn}></div>
                    </div>
                    {SideBarLinksArray.map((link, i) => {
                        return (
                            <div key={`l-${i}`} className={styles.sidebar_colappsed}>
                                <NavLink
                                    className={`icon ${link.iconClass}`}
                                    to={link.path}
                                ></NavLink>
                            </div>
                        );
                    })}
                    <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                        <div className={styles.sidebar_colappsed}>
                            <NavLink
                                className={"icon admins_icon"}
                                to={"/admin-page/admins"}
                            ></NavLink>
                        </div>
                        <div className={styles.sidebar_colappsed}>
                            <NavLink
                                className={"icon statistics_icon"}
                                to={"/admin-page/"}
                            ></NavLink>
                        </div>
                    </AccessControl>
                </div>
            ) : (
                <div className={styles.sidebar}>
                    <div className={styles.header_menu_row}>
                        <h3 className={styles.menu_text}>Меню</h3>
                        <div onClick={toogleMenu} className={styles.close_btn}></div>
                    </div>
                    {SideBarLinksArray.map((fullLink, i) => {
                        return (
                            <NavLink key={`fl-${i}`} className={"sidebar_link"} to={fullLink.path}>
                                {fullLink.label}
                            </NavLink>
                        );
                    })}
                    <AccessControl allowedRoles={[ERoles.SUPERADMIN]}>
                        <NavLink className={"sidebar_link_"} to={"/admin-page/admins"}>
                            Администраторы
                        </NavLink>
                        <NavLink className={"sidebar_link_"} to={"/admin-page/"}>
                            Статистика
                        </NavLink>
                    </AccessControl>
                </div>
            )}
        </>
    );
};

export default SideBar;
