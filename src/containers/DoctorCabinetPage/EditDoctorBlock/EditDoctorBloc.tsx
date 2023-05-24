import { Formik, Field, Form } from "formik";
import { FormBox } from "../../UserForms/FormBox/FormBox";
import Btn from "../../../components/UI/Btn/Btn";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { useEditUserMutation } from "../../../app/services/users";
import { useAppSelector } from "../../../app/hooks";
import { validationSchemaEditUser } from "../../../schemas/validationSchemaEditUser";
import styles from "./EditDoctor.module.css";
import MaskedInput from "react-text-mask";
import { FunctionComponent, ReactElement, useRef, useState } from "react";
import IEditDoctorBlockProps from "./IEditDoctorBlockProps";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";

const EditDoctorBlock: FunctionComponent<IEditDoctorBlockProps> = (props) => {
    const phoneNumberMask = ["+","7","(",/\d/,/\d/,/\d/,")",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/];
    const [editUser, { isError, isSuccess, error: editUserError }] = useEditUserMutation();

    const { user } = useAppSelector(state => state.auth);
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    const successHandler = () => { 
        // props.modalCloser();
        toast.info("Личные данные изменены");
    };

    isError && errorHandler(editUserError);
    isSuccess && successHandler();
    return (
        <FormBox>
            <p>Изменить данные пользователя</p>
            <Formik
                initialValues={{
                    name: user!.name,
                    surname: user!.surname,
                    patronim: user!.patronim,
                    phone: user!.phone,
                }}
                validateOnBlur
                onSubmit={(values) => {
                    editUser({id: user!.id, userDto: values});
                }}
                validationSchema={validationSchemaEditUser}
            >
                {({ isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <Form className={styles.LoginForm}>
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                {touched.name && errors.name ? <p className={styles.typeError}>{errors.name}</p> : <p className={styles.typeText}></p>}
                                <Field className={styles.LoginInput} name="name" type="text" placeholder="Имя" />
                            </div>
                            <div className={styles.input_flex_column}>
                                {touched.surname && errors.surname ? <p className={styles.typeError}>{errors.surname}</p> : <p className={styles.typeText}></p>}
                                <Field className={styles.LoginInput} name="surname" type="text" placeholder="Фамилия" />
                            </div>
                        </div>
                        {touched.patronim && errors.patronim ? <p className={styles.typeError}>{errors.patronim}</p> : <p className={styles.typeText}></p>}
                        <Field className={styles.LoginInput} name="patronim" type="text" placeholder="Отчество" />
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                {touched.phone && errors.phone ? <p className={styles.typeError}>{errors.phone}</p> : <p className={styles.typeText}></p>}
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
                            </div>   
                        </div>
                        <Btn title="Отмена" onclick={() => props.modalCloser()} size={EBtnSize.big} types={EBtnTypes.submit} />
                        <Btn disabled={!isValid} title="Редактировать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default EditDoctorBlock;