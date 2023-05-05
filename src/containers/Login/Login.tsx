import React, {useState, FormEvent, ChangeEvent, useEffect} from "react";
import styles from "./Login.module.css";
import { useLoginMutation } from "../../app/services/users";
import IUserLoginDto from "../../interfaces/IUser/IUserLoginDto";

const Login: React.FunctionComponent = (): React.ReactElement => {
    const [loginInput, setLoginInput] = useState<IUserLoginDto>({
        email: "",
        password: ""
    });
    
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
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
            if (!loginData) {
                await loginUser(loginInput);
            }
        }
    };

    useEffect(() => {
        if (loginIsError) {
            console.log(loginIsError);
        }
        if (loginIsSuccess) {
            console.log(loginIsSuccess);
        }
    }, []);
    
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
                <button className={styles.LoginButton}>Войти</button>
            </form>
        </div>
    );
};

export default Login;