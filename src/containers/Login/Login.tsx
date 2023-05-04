import React from "react";
import styles from "./Login.module.css";

const Login: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.Login}>
            <h1 className={styles.LoginTitle}>Вход</h1>
            <form className={styles.LoginForm}>
                <input 
                    className={styles.LoginInput}
                    type="text"
                    placeholder="Email" />
                <input 
                    className={styles.LoginInput}
                    type="password"
                    placeholder="Пароль" />
                <button className={styles.LoginButton}>Войти</button>
            </form>
        </div>
    );
};

export default Login;