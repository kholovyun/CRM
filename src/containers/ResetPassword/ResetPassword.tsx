import { validationSchemaPasswords } from "../../schemas/validationSchemaPasswords";
import { useSetPasswordMutation } from "../../app/services/password";
import styles from "../Login/Login.module.css";
import React from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { Container } from "../../components/UI/Container/Container";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const urlParams = new URLSearchParams(window.location.search);
    const getQuery = urlParams.get("token");
    const navigator = useNavigate();

    const [setPassword, { isError, isSuccess }] = useSetPasswordMutation();

    isSuccess && (
        navigator("/login"),
        toast.success("Пароль изменен")
    );
    isError && toast.error("Неудачно ошибка сервера");

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
                    {({ errors, touched, isValid, handleSubmit }) => (
                        <Form className={styles.LoginForm}>
                            <Field className={styles.LoginInput} name="password" type="password" placeholder="Пароль" />
                            {touched.password && errors.password ? <p className={styles.typeError}>{errors.password}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="passwordRepeat" type="password" placeholder="Повторите пароль" />
                            {touched.passwordRepeat && errors.passwordRepeat ? <p className={styles.typeError}>{errors.passwordRepeat}</p> : <p className={styles.typeText}></p>}
                            <Btn disabled={!isValid} title="Подтвердить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default ResetPassword;