import React, { useEffect } from "react";
import { validationSchema } from "../../schemas/validationSchema";
import { useLoginMutation } from "../../app/services/users";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { Container } from "../../components/UI/Container/Container";

const Login: React.FunctionComponent = (): React.ReactElement => {
    const [loginUser, { data, isError, isSuccess }] = useLoginMutation();
    const { user } = useAppSelector(state => state.auth);
    const navigator = useNavigate();

    isError && toast.error("Неверно указан Email или пароль");
    isSuccess && toast.success(`Добро пожаловать ${data?.name} вход выполнен`);

    useEffect(() => {
        user && navigator("/cabinet");
    }, [user]);

    return (
        <Container>
            <div className={styles.Login}>
                <h1 className={styles.LoginTitle}>Вход</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validateOnBlur
                    onSubmit={async (values, actions) => {
                        await loginUser(values);
                        actions.resetForm();
                    }}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => (
                        <div className={styles.LoginForm}>
                            <input
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                className={styles.LoginInput}
                                type="text"
                                placeholder="Email" />
                            {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                            <input
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                className={styles.LoginInput}
                                type="password"
                                placeholder="Пароль" />
                            {touched.password && errors.password ? <p className={styles.typeError}>{errors.password}</p> : <p className={styles.typeText}></p>}
                            <a className={styles.forgotlink} href="/forgot-password">Забыли пароль?</a>
                            <Btn disabled={!isValid} title="Войти" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </div>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default Login;