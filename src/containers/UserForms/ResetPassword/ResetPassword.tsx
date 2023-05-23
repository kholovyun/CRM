import { validationSchemaPasswords } from "../../../schemas/validationSchemaPasswords";
import { useSetPasswordMutation } from "../../../app/services/password";
import styles from "../UserForms.module.css";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import { Container } from "../../../components/UI/Container/Container";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";

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
                            {touched.password && errors.password ? <p className={styles.typeError}>{errors.password}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="password" type="password" placeholder="Пароль" />
                            {touched.passwordRepeat && errors.passwordRepeat ? <p className={styles.typeError}>{errors.passwordRepeat}</p> : <p className={styles.typeText}></p>}
                            <Field className={`${styles.LoginInput} ${styles.margin_bottom}`} name="passwordRepeat" type="password" placeholder="Повторите пароль" />
                            <Btn disabled={!isValid} title="Подтвердить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active}/>
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default ResetPassword;