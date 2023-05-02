import React from "react";
import styles from "./Login.module.css";

const Login: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.Login}>
            <form className={styles.LoginForm}>
                <div className={styles.LoginField}>
                    <label className={styles.LoginLabel} htmlFor="">Логин</label>
                    <input 
                        className={styles.LoginInput}
                        type="text"
                        placeholder="Логин" />
                </div>
                <div className={styles.LoginField}>
                    <label className={styles.LoginLabel} htmlFor="">Пароль</label>
                    <input 
                        className={styles.LoginInput}
                        type="password"
                        placeholder="Пароль" />
                </div>
                <button className={styles.LoginButton}>Войти</button>
            </form>
        </div>
    );
};

export default Login;