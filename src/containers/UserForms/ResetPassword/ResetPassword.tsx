import { validationSchemaPasswords } from "../../../schemas/validationSchemaPasswords";
import { useSetPasswordMutation } from "../../../app/services/password";
import styles from "../UserForms.module.css";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const ResetPassword: FunctionComponent = (): ReactElement => {
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
                    {({ isValid, handleSubmit }) => (
                        <Form className={styles.form_column}>
                            <Title text="Сменить пароль" />
                            <ErrorMessage className={styles.error_text} name="password" component="div"/>
                            <Field className={styles.login_input} name="password" type="password" placeholder="Пароль" />
                            <ErrorMessage className={styles.error_text} name="passwordRepeat" component="div"/>
                            <Field className={styles.login_input} name="passwordRepeat" type="password" placeholder="Повторите пароль" />
                            <Btn disabled={!isValid} title="Подтвердить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active}/>
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default ResetPassword;