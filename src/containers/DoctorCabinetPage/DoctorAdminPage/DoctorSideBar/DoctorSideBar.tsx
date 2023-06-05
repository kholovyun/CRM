import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../AdminPage/SideBar/SideBar.module.css";
import "../../../AdminPage/SideBar/SideBarNavLink.css";
import IDoctorSideBarProps from "./IDoctorSideBarProps";

const DoctorSideBar: React.FunctionComponent<IDoctorSideBarProps> = (
    props: IDoctorSideBarProps
): React.ReactElement => {
    const [isShowingMenu, setIsShowingMenu] = useState(false);

    const toogleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
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
                    <div className={styles.sidebar_colappsed}>
                        <NavLink
                            className={"icon children_icon"}
                            to={`/doctor-admin-page/${props.doctorId}/children`}
                        ></NavLink>
                    </div>
                    <div className={styles.sidebar_colappsed}>
                        <NavLink
                            className={"icon parents_icon"}
                            to={`/doctor-admin-page/${props.doctorId}/parents`}
                        ></NavLink>
                    </div>
                    <div className={styles.sidebar_colappsed}>
                        <NavLink
                            className={"icon statistics_icon"}
                            to={`/doctor-admin-page/${props.doctorId}`}
                        ></NavLink>
                    </div>
                </div>
            ) : (
                <div className={styles.sidebar}>
                    <div className={styles.header_menu_row}>
                        <h3 className={styles.menu_text}>Меню</h3>
                        <div onClick={toogleMenu} className={styles.close_btn}></div>
                    </div>
                    <NavLink
                        className={"sidebar_link"}
                        to={`/doctor-admin-page/${props.doctorId}/children`}
                    >
                        Пациенты
                    </NavLink>
                    <NavLink
                        className={"sidebar_link_"}
                        to={`/doctor-admin-page/${props.doctorId}/parents`}
                    >
                        Родители пациентов
                    </NavLink>
                    <NavLink
                        className={"sidebar_link_"}
                        to={`/doctor-admin-page/${props.doctorId}`}
                    >
                        Статистика
                    </NavLink>
                </div>
            )}
        </>
    );
};

export default DoctorSideBar;
