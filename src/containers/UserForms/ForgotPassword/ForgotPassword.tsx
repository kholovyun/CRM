import { validationSchemaEmail } from "../../../schemas/validationSchemaEmail";
import { useResetPasswordMutation } from "../../../app/services/password";
import styles from "../UserForms.module.css";
import { EBtnSize } from "../../../enums/EBtnSize";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import React from "react";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { Container } from "../../../components/UI/Container/Container";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { EBtnClass } from "../../../enums/EBtnClass";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FunctionComponent = (): React.ReactElement => {
    const [resetPassword, { data, isError, isSuccess, error: forgotError }] = useResetPasswordMutation();
    const navigator = useNavigate();
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка: ${err.error ? err.error : err.data.message}`);
    };

    isError && errorHandler(forgotError);
    isSuccess && toast.info(`Ссылка отправлена на Ваш Email ${data?.email}`);

    return (
        <Container>
            <FormBox>
                {isSuccess ? <Title text="Ссылка отправлена на Ваш Email" /> : <Title text="Сбросить пароль" />}
                {isSuccess ? <div className={styles.resetBox}><Btn title="На главную" onclick={() => navigator("/")} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} /></div> : <Formik
                    initialValues={{ email: "" }}
                    validateOnBlur
                    onSubmit={async (values) => {
                        await resetPassword(values);
                    }}
                    validationSchema={validationSchemaEmail}
                >
                    {({ errors, touched, isValid, handleSubmit }) => (
                        <Form className={styles.LoginForm}>
                            {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                            <Field className={`${styles.LoginInput} ${styles.margin_bottom}`} name="email" type="text" placeholder="Email" />
                            <Btn disabled={!isValid} title="Сбросить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} />
                        </Form>
                    )}
                </Formik>}
            </FormBox>
        </Container>
    );
};

export default ForgotPassword;