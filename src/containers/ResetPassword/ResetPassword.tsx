import React, {useState, ChangeEvent, FormEvent} from "react";
import styles from "./ResetPassword.module.css";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userValues, setUserValues] = useState<{password: string, password_repeat: string}>({
        password: "",
        password_repeat: ""
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (userValues.password !== userValues.password_repeat) {
            setErrorMessage("Пароли разные");
            return;
        }
    };

    return (
        <div className={styles.ResetPassword}>
            <form onSubmit={submitHandler} className={styles.PasswordForm}>
                <div className={styles.PasswordField}>
                    <label className={styles.PasswordLabel} htmlFor="">Новый пароль</label>
                    <input 
                        className={styles.PasswordInput}
                        onChange={inputHandler}
                        value={userValues.password}
                        name="password"
                        type="password"
                        placeholder="Новый пароль" />
                </div>
                <div className={styles.PasswordField}>
                    <label className={styles.PasswordLabel} htmlFor="">Подтверждение пароля</label>
                    <input 
                        className={styles.PasswordInput}
                        onChange={inputHandler}
                        value={userValues.password_repeat}
                        name="password_repeat"
                        type="password"
                        placeholder="Повторите пароль" />
                </div>
                <button className={styles.PasswordButton}>Установить</button>
                <p>{errorMessage}</p>
            </form>
        </div>
    );
};

export default ResetPassword;