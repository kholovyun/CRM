import { validationSchemaEmail } from "../../schemas/validationSchemaEmail";
import { useResetPasswordMutation } from "../../app/services/password";
import { Button } from "../../components/UI/Button/Button";
import { EButtonTypes } from "../../enums/EButtonTypes";
import styles from "../Login/Login.module.css";
import { EButton } from "../../enums/EButton";
import { toast } from "react-toastify";
import { Formik } from "formik";
import React from "react";

const ForgotPassword: React.FunctionComponent = (): React.ReactElement => {
    const [resetPassword, { isError, isSuccess }] = useResetPasswordMutation();
    isError && isError && toast.error("Ошибка сервера");
    isSuccess && toast.success("Ссылка отправлена на Ваш Email");

    return (
        <div className={styles.Login}>
            <h1 className={styles.LoginTitle}>Сбросить пароль</h1>
            <Formik
                initialValues={{ email: "" }}
                validateOnBlur
                onSubmit={async (values) => {
                    await resetPassword(values);
                }}
                validationSchema={validationSchemaEmail}
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
                        <Button disable={!isValid} name="Сбросить" onclick={handleSubmit} size={EButton.big} types={EButtonTypes.submit} />
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;