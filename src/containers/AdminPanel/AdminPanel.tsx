import React from "react";
import styles from "./AdminPanel.module.css";
// import { Link } from "react-router-dom";

const AdminPanel: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.AdminPanel}>
            <div className={styles.AdminPanel_container}>
                <h2>Добро пожаловать!</h2>
                <div>
                    <button className={styles.AdminPanel_btn}>Регистрация врача</button>
                    <button className={styles.AdminPanel_btn}>Регистрация пациента</button>
                </div>
                {/* <Link to={"/register-doctor"}>Регистрация врача</Link>
                <Link to={"/register-patient"}>Регистрация пациента</Link> */}
            </div>
        </div>
    );
};

export default AdminPanel;