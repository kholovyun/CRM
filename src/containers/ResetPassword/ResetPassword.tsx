import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useSetPasswordMutation } from "../../app/services/password";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const urlParams = new URLSearchParams(window.location.search);
    const getQuery = urlParams.get("token");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userValues, setUserValues] = useState<{ password: string, password_repeat: string }>({
        password: "",
        password_repeat: ""
    });
    const [setPassword, { data, isError, isSuccess }] = useSetPasswordMutation();

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserValues(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (userValues.password !== userValues.password_repeat && !getQuery) {
            setErrorMessage("Пароли разные");
            return;
        }
        const setHandler = await setPassword({ password: userValues.password, token: getQuery || "" });
        console.log(`${JSON.stringify(setHandler)}`);
    };

    useEffect(() => {
        if (data) {
            console.log("data===============================");
            console.log(data);
            console.log("====================================");
            setErrorMessage("Password changed");
        }
        if (isError) {
            console.log("isError==============================");
            console.log(isError);
            setErrorMessage("Password incorrect");
            console.log("====================================");
        }
    }, [setPassword, isSuccess]);

    return (
        <div className={styles.ResetPassword}>
            <h1 className={styles.ResetTitle}>Сбросить пароль</h1>
            <p>Message: {errorMessage && errorMessage}</p>
            <form onSubmit={submitHandler} className={styles.PasswordForm}>
                <input
                    className={styles.PasswordInput}
                    onChange={inputHandler}
                    value={userValues.password}
                    name="password"
                    type="password"
                    placeholder="Новый пароль" />
                <input
                    className={styles.PasswordInput}
                    onChange={inputHandler}
                    value={userValues.password_repeat}
                    name="password_repeat"
                    type="password"
                    placeholder="Повторите пароль" />
                <button className={styles.PasswordButton}>Установить</button>
                <p className={styles.errorText}>{errorMessage}</p>
            </form>
            <button className={styles.PasswordButton} onClick={() => setErrorMessage("")}>clear</button>
        </div>
    );
};

export default ResetPassword;