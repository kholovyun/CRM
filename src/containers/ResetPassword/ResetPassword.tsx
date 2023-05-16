import { validationSchemaPasswords } from "../../schemas/validationSchemaPasswords";
import { useSetPasswordMutation } from "../../app/services/password";
import styles from "../Login/Login.module.css";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { Container } from "../../components/UI/Container/Container";
import { useNavigate } from "react-router-dom";
import { FormBox } from "../../components/UI/FormBox/FormBox";
import { Title } from "../../components/UI/Title/Title";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";

const ResetPassword: React.FunctionComponent = (): React.ReactElement => {
    const urlParams = new URLSearchParams(window.location.search);
    const getQuery = urlParams.get("token");
    const navigator = useNavigate();

    const [setPassword, { data, isError, isSuccess, error }] = useSetPasswordMutation();

    const transferHandler = () => {
        navigator("/login");
        toast.success(data?.message);
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка: ${err.error ? err.error : err.data.message}`);
    };

    isError && errorHandler(error);

    useEffect(() => {
        isSuccess && transferHandler();
    }, [data]);

    return (
        <Container>
            <FormBox>
                <Title text="Сменить пароль" />
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
            </FormBox>
        </Container>
    );
};

export default ResetPassword;