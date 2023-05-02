import React from "react";
import styles from "./AdminPanel.module.css";
import { Link } from "react-router-dom";

const AdminPanel: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.AdminPanel}>
            <div className={styles.AdminPanel_container}>
                <h2>Добро пожаловать!</h2>
                <div>
                    <Link to={"/register-user"}>Зарегистрировать пользователя</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;