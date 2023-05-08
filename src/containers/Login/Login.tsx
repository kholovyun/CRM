import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import styles from "./Login.module.css";
import { useLoginMutation } from "../../app/services/users";
import IUserLoginDto from "../../interfaces/IUser/IUserLoginDto";
import { useAppSelector } from "../../app/hooks";

const Login: React.FunctionComponent = (): React.ReactElement => {
    const myState = useAppSelector(state => state.auth);
    const [loginInput, setLoginInput] = useState<IUserLoginDto>({
        email: "",
        password: ""
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [loginUser, { data: loginData, isError: loginIsError, isSuccess: loginIsSuccess }] = useLoginMutation();

    const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`${loginInput.email} + ${loginInput.password}`);
        if (loginInput.email.trim().length && loginInput.password.trim().length) {
            await loginUser(loginInput);
        }
    };

    useEffect(() => {
        if (loginIsError) {
            console.log(loginIsError);
            console.log(loginData);
        }
        if (loginIsSuccess) {
            console.log(loginIsSuccess);
            console.log(loginData);
        }
    }, [loginUser]);

    return (
        <div className={styles.Login}>
            <h1 className={styles.LoginTitle}>Вход</h1>
            <form onSubmit={loginHandler} className={styles.LoginForm}>
                <input
                    onChange={inputChangeHandler}
                    value={loginInput.email}
                    name="email"
                    className={styles.LoginInput}
                    type="text"
                    placeholder="Email" />
                <input
                    onChange={inputChangeHandler}
                    value={loginInput.password}
                    name="password"
                    className={styles.LoginInput}
                    type="password"
                    placeholder="Пароль" />
                <a className={styles.forgotlink} href="/forgot-password">If forgot-password? Forward link</a>
                <button className={styles.LoginButton}>Войти</button>
            </form>
            <button className={styles.LoginButton} onClick={() => console.log(myState)}>Show</button>
        </div>
    );
};

export default Login;