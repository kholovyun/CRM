import React, { useEffect } from "react";
import styles from "./Login.module.css";
import { validationSchema } from "../../schemas/validationSchema";
import { useLoginMutation } from "../../app/services/users";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";

const Login: React.FunctionComponent = (): React.ReactElement => {
    const [loginUser, { data, isError, isSuccess }] = useLoginMutation();
    const myState = useAppSelector(state => state.auth);
    const navigator = useNavigate();

    isError && toast.error("Неверно указан Email или пароль");
    isSuccess && toast.success(`Добро пожаловать ${data?.name} вход выполнен`);

    useEffect(() => {
        if (myState.user) {
            navigator("/cabinet");
        }
    }, [myState.user]);

    return (
        <div className={styles.Login}>
            <h1 className={styles.LoginTitle}>Вход</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validateOnBlur
                onSubmit={async (values, actions) => {
                    console.log(values);
                    await loginUser(values);
                    actions.resetForm();
                }}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <div className={styles.LoginForm}>
                        <input
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            className={styles.LoginInput}
                            type="text"
                            placeholder="Email" />
                        {touched.email && errors.email && <p className={styles.typeError}>{errors.email}</p>}
                        <input
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            className={styles.LoginInput}
                            type="password"
                            placeholder="Пароль" />
                        {touched.password && errors.password && <p className={styles.typeError}>{errors.password}</p>}
                        <a className={styles.forgotlink} href="/forgot-password">Забыли пароль?</a>
                        <button disabled={!isValid && dirty} type="submit" onClick={() => handleSubmit()} className={styles.LoginButton}>Войти</button>
                    </div>
                )}
            </Formik>
            <button className={styles.LoginButton} onClick={() => console.log(myState)}>Show</button>
        </div>
    );
};

export default Login;