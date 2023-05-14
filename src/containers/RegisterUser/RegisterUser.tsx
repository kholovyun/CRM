import React from "react";
import styles from "../Login/Login.module.css";
import { Formik, Field, Form } from "formik";
import { validationSchemaRegUser } from "../../schemas/validationSchemaRegUser";
import { ERoles } from "../../enums/ERoles";
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
import { Contetnt } from "../../components/UI/Contetnt/Contetnt";
import { Title } from "../../components/UI/Title/Title";


const RegisterUser: React.FunctionComponent = (): React.ReactElement => {
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
    isSuccess && toast.success("Письмо активации отправлено на почту");

    return (
        <Contetnt>
            <Title text="Регистрация" />
            <Formik
                initialValues={{
                    name: "",
                    surname: "",
                    patronim: "",
                    phone: "",
                    email: "",
                    role: ""
                }}
                validateOnBlur
                onSubmit={(values) => {
                    createUser(values);
                }}
                validationSchema={validationSchemaRegUser}
            >
                {({ isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <Form className={styles.LoginForm}>
                        <Field className={styles.LoginInput} name="name" type="text" placeholder="Имя" />
                        {touched.name && errors.name ? <p className={styles.typeError}>{errors.name}</p> : <p className={styles.typeText}></p>}
                        <Field className={styles.LoginInput} name="surname" type="text" placeholder="Фамилия" />
                        {touched.surname && errors.surname ? <p className={styles.typeError}>{errors.surname}</p> : <p className={styles.typeText}></p>}
                        <Field className={styles.LoginInput} name="patronim" type="text" placeholder="Отчество" />
                        {touched.patronim && errors.patronim ? <p className={styles.typeError}>{errors.patronim}</p> : <p className={styles.typeText}></p>}
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
                        <Field as="select" name="role" className={styles.LoginInput}>
                            <option value="">Выберите роль</option>
                            <option value={ERoles.DOCTOR}>Врач</option>
                            <option value={ERoles.ADMIN}>Админ</option>
                        </Field>
                        {touched.role && errors.role ? <p className={styles.typeError}>{errors.role}</p> : <p className={styles.typeText}></p>}
                        <Btn disabled={!isValid} title="Создать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                    </Form>
                )}
            </Formik>
        </Contetnt>
    );
};

export default RegisterUser;