import React from "react";
import styles from "./AdminPanel.module.css";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../app/services/users";

const AdminPanel: React.FunctionComponent = (): React.ReactElement => {
    const {data: users, isLoading: isUsersLoading} = useGetUsersQuery();
    if (isUsersLoading) return <h1>Идет загрузка...</h1>;
    return (
        <div className={styles.AdminPanel}>
            <div className={styles.AdminPanel_container}>
                <h2>Добро пожаловать!</h2>
                <div>
                    <Link to={"/register-user"}>Зарегистрировать пользователя</Link>
                </div>
                {users && users?.map(user => {
                    return (
                        <div key={user.id}>
                            <h2>{user.name}</h2>
                            <h3>{user.surname}</h3>
                            <h4>{user.email}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminPanel;