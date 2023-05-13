import { validationSchemaEmail } from "../../schemas/validationSchemaEmail";
import { useResetPasswordMutation } from "../../app/services/password";
import styles from "../Login/Login.module.css";
import { EBtnSize } from "../../enums/EBtnSize";
import { toast } from "react-toastify";
import { Formik } from "formik";
import React from "react";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { Container } from "../../components/UI/Container/Container";

const ForgotPassword: React.FunctionComponent = (): React.ReactElement => {
    const [resetPassword, { isError, isSuccess }] = useResetPasswordMutation();
    isError && isError && toast.error("Ошибка сервера");
    isSuccess && toast.success("Ссылка отправлена на Ваш Email");

    return (
        <Container>
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
                            <Btn disabled={!isValid} title="Сбросить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </div>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default ForgotPassword;