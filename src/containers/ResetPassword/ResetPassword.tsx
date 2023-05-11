import { validationSchemaPasswords } from "../../schemas/validationSchemaPasswords";
import { useSetPasswordMutation } from "../../app/services/password";
import { Button } from "../../components/UI/Button/Button";
import { EButtonTypes } from "../../enums/EButtonTypes";
import styles from "../Login/Login.module.css";
import { EButton } from "../../enums/EButton";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Formik } from "formik";

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
                        <Button disable={!isValid} name="Подтвердить" onclick={handleSubmit} size={EButton.big} types={EButtonTypes.submit} />
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;