import { validationSchemaEmail } from "../../schemas/validationSchemaEmail";
import { useResetPasswordMutation } from "../../app/services/password";
import styles from "../Login/Login.module.css";
import { EBtnSize } from "../../enums/EBtnSize";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import React from "react";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { Container } from "../../components/UI/Container/Container";
import { FormBox } from "../../components/UI/FormBox/FormBox";
import { Title } from "../../components/UI/Title/Title";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";

const ForgotPassword: React.FunctionComponent = (): React.ReactElement => {
    const [resetPassword, { data, isError, isSuccess, error: forgotError }] = useResetPasswordMutation();
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка: ${err.error ? err.error : err.data.message}`);
    };

    isError && errorHandler(forgotError);
    isSuccess && toast.info(`Ссылка отправлена на Ваш Email ${data?.email}`);

    return (
        <Container>
            <FormBox>
                <Title text="Сбросить пароль" />
                <Formik
                    initialValues={{ email: "" }}
                    validateOnBlur
                    onSubmit={async (values) => {
                        await resetPassword(values);
                    }}
                    validationSchema={validationSchemaEmail}
                >
                    {({ errors, touched, isValid, handleSubmit }) => (
                        <Form className={styles.LoginForm}>
                            <Field className={styles.LoginInput} name="email" type="text" placeholder="Email" />
                            {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                            <Btn disabled={!isValid} title="Сбросить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default ForgotPassword;