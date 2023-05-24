import React, { useEffect } from "react";
import { validationSchema } from "../../../schemas/validationSchema";
import { useLoginMutation } from "../../../app/services/users";
import { useAppSelector } from "../../../app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../UserForms.module.css";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { Container } from "../../../components/UI/Container/Container";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { Title } from "../Title/Title";
import { FormBox } from "../FormBox/FormBox";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { ERoles } from "../../../enums/ERoles";
import { EBtnClass } from "../../../enums/EBtnClass";

const Login: React.FC = (): React.ReactElement => {
    const [loginUser, { data, isError, isSuccess, error: loginErrors }] = useLoginMutation();
    const { user } = useAppSelector(state => state.auth);
    const navigator = useNavigate();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка: ${err.error ? err.error : err.data.message}`);
    };

    isError && errorHandler(loginErrors);
    isSuccess && toast.success(`Добро пожаловать ${data?.name} вход выполнен`);

    useEffect(() => {
        if (user) {
            if (user.role === ERoles.ADMIN || user.role === ERoles.SUPERADMIN) {
                navigator("/admin-page/doctors");
            } else if (user.role === ERoles.DOCTOR) {
                navigator("/cabinet");
            } else {
                navigator(`/doctor-cabinet/${user.id}`);
            }
        }
    }, [user]);

    return (
        <Container>
            <FormBox>
                <Title text="Вход" />
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validateOnBlur
                    onSubmit={async (values) => {
                        await loginUser(values);
                    }}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched, isValid, handleSubmit }) => (
                        <Form className={styles.LoginForm}>
                            {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="email" type="text" placeholder="Email" />
                            {touched.password && errors.password ? <p className={styles.typeError}>{errors.password}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="password" type="password" placeholder="Пароль" />
                            <NavLink to={"/forgot-password"} className={styles.forgotlink}>Забыли пароль?</NavLink>
                            <Btn disabled={!isValid} title="Войти"
                                onclick={handleSubmit}
                                size={EBtnSize.big}
                                btnClass={EBtnClass.dark_active}
                                types={EBtnTypes.submit} />
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default Login;