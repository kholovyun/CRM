import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ForgotPassword.module.css";
import { useResetPasswordMutation } from "../../app/services/password";

const ForgotPassword: React.FunctionComponent = (): React.ReactElement => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userValues, setUserValues] = useState<{ email: string }>({
        email: "",
    });
    const [resetPassword] = useResetPasswordMutation();

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserValues(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (userValues.email.trim().length > 0) {
            setErrorMessage(`Email: ${userValues.email}`);
            resetPassword(userValues);
        }
    };

    return (
        <div className={styles.ForgotPassword}>
            <h1 className={styles.ResetTitle}>Сбросить пароль</h1>
            <form onSubmit={submitHandler} className={styles.PasswordForm}>
                <input
                    className={styles.PasswordInput}
                    onChange={inputHandler}
                    value={userValues.email}
                    name="email"
                    type="email"
                    placeholder="Введите ваш email" />
                <button className={styles.PasswordButton}>Сбросить</button>
                <p>{errorMessage}</p>
            </form>
        </div>
    );
};

export default ForgotPassword;