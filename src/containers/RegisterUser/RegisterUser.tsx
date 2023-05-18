import React from "react";
import styles from "../Login/Login.module.css";
import { Formik, Field, Form } from "formik";
import { validationSchemaRegUser } from "../../schemas/validationSchemaRegUser";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../app/services/users";
import MaskedInput from "react-text-mask";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { FormBox } from "../../components/UI/FormBox/FormBox";
import { Title } from "../../components/UI/Title/Title";

const RegisterUser: React.FunctionComponent<{role: string, title: string}> = (props: {role: string, title: string}): React.ReactElement => {
    const [createUser, { isError, isSuccess, error: createUserError }] = useCreateUserMutation();
    const phoneNumberMask = [
        "+",
        "7",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
    ];

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    isError && errorHandler(createUserError);
    isSuccess && toast.info("Письмо активации отправлено на почту");

    return (

        <FormBox>
            <Title text={props.title} />
            <Formik
                initialValues={{
                    name: "",
                    surname: "",
                    patronim: "",
                    phone: "",
                    email: "",
                    role: props.role
                }}
                validateOnBlur
                onSubmit={(values) => {
                    createUser(values);
                }}
                validationSchema={validationSchemaRegUser}
            >
                {({ isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <Form className={styles.LoginForm}>
                        <div className={styles.full_name_inputs}>
                            <Field className={styles.LoginInput} name="name" type="text" placeholder="Имя" />
                            {touched.name && errors.name ? <p className={styles.typeError}>{errors.name}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="surname" type="text" placeholder="Фамилия" />
                            {touched.surname && errors.surname ? <p className={styles.typeError}>{errors.surname}</p> : <p className={styles.typeText}></p>}
                        </div>
                        <Field className={styles.LoginInput} name="patronim" type="text" placeholder="Отчество" />
                        {touched.patronim && errors.patronim ? <p className={styles.typeError}>{errors.patronim}</p> : <p className={styles.typeText}></p>}
                        <div className={styles.register_phone_mail_box}>
                            <Field
                                name="phone"
                                type="text"
                                render={({ ...field }) => (
                                    <MaskedInput
                                        {...field}
                                        mask={phoneNumberMask}
                                        id="phone"
                                        placeholder="+7(___)___-__-__"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={styles.LoginInput}
                                    />
                                )}
                            >
                            </Field>
                            {touched.phone && errors.phone ? <p className={styles.typeError}>{errors.phone}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="email" type="text" placeholder="Email" />
                            {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                        </div>

                        <Field hidden type="text" name="role" className={styles.LoginInput} value={props.role} />
                        {touched.role && errors.role ? <p className={styles.typeError}>{errors.role}</p> : <p className={styles.typeText}></p>}
                        <Btn disabled={!isValid} title="Создать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default RegisterUser;