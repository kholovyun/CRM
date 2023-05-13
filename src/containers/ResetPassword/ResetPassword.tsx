import { validationSchemaPasswords } from "../../schemas/validationSchemaPasswords";
import { useSetPasswordMutation } from "../../app/services/password";
import styles from "../Login/Login.module.css";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { Container } from "../../components/UI/Container/Container";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const urlParams = new URLSearchParams(window.location.search);
    const getQuery = urlParams.get("token");

    const [setPassword, { isError, isSuccess }] = useSetPasswordMutation();

    isSuccess && toast.success("Пароль изменен");
    isError && toast.error("Неудачно ошибка сервера");

    useEffect(() => {
        //console.log("data===============================");
    }, []);

    return (
        <Container>
            <div className={styles.Login}>
                <h1 className={styles.LoginTitle}>Сменить пароль</h1>
                <Formik
                    initialValues={{
                        password: "",
                        passwordRepeat: ""
                    }}
                    validateOnBlur
                    onSubmit={async (values) => {
                        await setPassword({
                            token: getQuery || "",
                            password: values.password
                        });
                    }}
                    validationSchema={validationSchemaPasswords}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => (
                        <div className={styles.LoginForm}>
                            <input
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                className={styles.LoginInput}
                                type="password"
                                placeholder="Пароль" />
                            {touched.password && errors.password ? <p className={styles.typeError}>{errors.password}</p> : <p className={styles.typeText}></p>}
                            <input
                                onChange={handleChange}
                                value={values.passwordRepeat}
                                name="passwordRepeat"
                                onBlur={handleBlur}
                                className={styles.LoginInput}
                                type="password"
                                placeholder="Пароль" />
                            {touched.passwordRepeat && errors.passwordRepeat ? <p className={styles.typeError}>{errors.passwordRepeat}</p> : <p className={styles.typeText}></p>}
                            <Btn disabled={!isValid} title="Подтвердить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </div>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default ResetPassword;