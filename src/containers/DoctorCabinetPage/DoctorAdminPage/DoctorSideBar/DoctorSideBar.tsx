import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../AdminPage/SideBar/SideBar.module.css";
import "../../../AdminPage/SideBar/SideBarNavLink.css";
import IDoctorSideBarProps from "./IDoctorSideBarProps";
import { DoctorSideBarLinksArray } from "./DoctorSideBarLinksArray";

const DoctorSideBar: FunctionComponent<IDoctorSideBarProps> = (
    props: IDoctorSideBarProps
): ReactElement => {
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
                    {DoctorSideBarLinksArray.map((link, i) => {
                        return (
                            <div key={`l-${i}`} className={styles.sidebar_colappsed}>
                                <NavLink
                                    className={`icon ${link.iconClass}`}
                                    to={`/doctor-admin-page/${props.doctorId}${link.path}`}
                                ></NavLink>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.sidebar}>
                    <div className={styles.header_menu_row}>
                        <h3 className={styles.menu_text}>Меню</h3>
                        <div onClick={toogleMenu} className={styles.close_btn}></div>
                    </div>
                    {DoctorSideBarLinksArray.map((fullLink, i) => {
                        return (
                            <NavLink
                                key={`fl-${i}`}
                                className={"sidebar_link"}
                                to={`/doctor-admin-page/${props.doctorId}${fullLink.path}`}
                            >
                                {fullLink.label}
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default DoctorSideBar;
