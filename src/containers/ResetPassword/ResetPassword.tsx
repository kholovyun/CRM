import React, { useEffect } from "react";
import styles from "../Login/Login.module.css";
import { useSetPasswordMutation } from "../../app/services/password";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { Button } from "../../components/UI/Button/Button";
import { EButton } from "../../enums/EButton";
import { EButtonTypes } from "../../enums/EButtonTypes";
import { validationSchemaPasswords } from "../../schemas/validationSchemaPasswords";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const urlParams = new URLSearchParams(window.location.search);
    const getQuery = urlParams.get("token");

    const [setPassword, { isError, isSuccess }] = useSetPasswordMutation();

    isSuccess && toast.success("Пароль изменен");
    isError && toast.error("Неудачно ошибка сервера");

    useEffect(() => {
        // if (data) {
        //     console.log("data===============================");
        //     console.log("====================================");
        //     setErrorMessage("Password changed");
        // }
        // if (isError) {
        //     console.log("isError==============================");
        //     setErrorMessage("Password incorrect");
        //     console.log("====================================");
        // }
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
        // <div className={styles.ResetPassword}>
        //     <h1 className={styles.ResetTitle}>Сбросить пароль</h1>
        //     <p>Message: {errorMessage && errorMessage}</p>
        //     <form onSubmit={submitHandler} className={styles.PasswordForm}>
        //         <input
        //             className={styles.PasswordInput}
        //             onChange={inputHandler}
        //             value={userValues.password}
        //             name="password"
        //             type="password"
        //             placeholder="Новый пароль" />
        //         <input
        //             className={styles.PasswordInput}
        //             onChange={inputHandler}
        //             value={userValues.password_repeat}
        //             name="password_repeat"
        //             type="password"
        //             placeholder="Повторите пароль" />
        //         <button className={styles.PasswordButton}>Установить</button>
        //         <p className={styles.errorText}>{errorMessage}</p>
        //     </form>
        //     <button className={styles.PasswordButton} onClick={() => setErrorMessage("")}>clear</button>
        // </div>
    );
};

export default ResetPassword;