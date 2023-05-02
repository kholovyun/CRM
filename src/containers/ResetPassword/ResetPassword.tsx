import React from "react";
import styles from "./ResetPassword.module.css";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.ResetPassword}>
            <form className={styles.PasswordForm}>
                <div className={styles.PasswordField}>
                    <label className={styles.PasswordLabel} htmlFor="">Новый пароль</label>
                    <input 
                        className={styles.PasswordInput}
                        type="password"
                        placeholder="Новый пароль" />
                </div>
                <div className={styles.PasswordField}>
                    <label className={styles.PasswordLabel} htmlFor="">Подтверждение пароля</label>
                    <input 
                        className={styles.PasswordInput}
                        type="password"
                        placeholder="Повторите пароль" />
                </div>
                <button className={styles.PasswordButton}>Установить</button>
            </form>
        </div>
    );
};

export default ResetPassword;