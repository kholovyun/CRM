import { FunctionComponent, ReactElement, useState } from "react";
import styles from "../UserForms.module.css";
import { Formik, Field, Form } from "formik";
import { validationSchemaRegUser } from "../../../schemas/validationSchemaRegUser";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../../app/services/users";
import MaskedInput from "react-text-mask";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { useNavigate } from "react-router-dom";
import { ERoles } from "../../../enums/ERoles";
import { KGMask, KZMask, RUMask } from "../../../helpers/countryRegexs";
import KZFlag from "../../../assets/img/kz.png";
import KGFlag from "../../../assets/img/kg.png";
import RUFlag from "../../../assets/img/ru.png";
import { EDoctorLevel } from "../../../enums/EDoctorLevel";

const RegisterUser: FunctionComponent<{role: string, title: string}> = (props: {role: string, title: string}): ReactElement => {
    const navigate = useNavigate();
    const [createUser, { isError, isSuccess, error: createUserError }] = useCreateUserMutation();
    const [phoneMask, setPhoneMask] = useState(KZMask);
    const [placeholder, setPlaceholder] = useState("+7(___)___-__-__");
    const [flag, setFlag] = useState(KZFlag);

    const phoneMaskOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
        case "RU":
            setPhoneMask(RUMask);
            setPlaceholder("+7(___)___-__-__");
            setFlag(RUFlag);
            break;
        case "KG":
            setPhoneMask(KGMask);
            setPlaceholder("+996(___)__-__-__");
            setFlag(KGFlag);
            break;
        case "KZ":
            setPhoneMask(KZMask);
            setPlaceholder("+7(___)___-__-__");
            setFlag(KZFlag);
            break;
        default:
            setPhoneMask(KZMask);
            break;
        }
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    const successHandler = () => {
        if (props.role === ERoles.ADMIN) {
            toast.info(`${props.role} Администратор создан`);
        }
        if (props.role === ERoles.DOCTOR) {
            toast.info(`${props.role} Врач создан`);
        }
        navigate(-1);
    };

    isError && errorHandler(createUserError);
    isSuccess && successHandler();

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
                    role: props.role,
                    price: props.role === ERoles.DOCTOR ? 0 : null
                }}
                validateOnBlur
                onSubmit={(values) => {
                    createUser(values);
                }}
                validationSchema={validationSchemaRegUser}
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
                                <div className={styles.two_inputs_row}>
                                    <div className={styles.select_flag_wrapper}>
                                        <div className={styles.flag_wrapper}><img className={styles.flag_image} src={flag} alt="" /></div>
                                        <div className={styles.select_wrapper}>
                                            <select className={styles.country_select} defaultValue={"KZ"} onChange={phoneMaskOnChange}>
                                                <option value={"KZ"}>KZ</option>
                                                <option value={"KG"}>KG</option>
                                                <option value={"RU"}>RU</option>
                                            </select>
                                        </div>
                                    </div>
                                    <Field
                                        name="phone"
                                        type="text">
                                        {({ ...field }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={phoneMask}
                                                id="phone"
                                                placeholder={placeholder}
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={styles.LoginInput}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>
                        </div>
                        {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                        <Field className={styles.LoginInput} name="email" type="text" placeholder="Email" />
                        {props.role === ERoles.DOCTOR ?
                            <div className={styles.input_flex_column}>
                                <div className={styles.select_wrapper}>
                                    <Field className={styles.custom_select} name="price" as="select" placeholder="Уровень цены">
                                        <option disabled value="">Уровень цены</option>
                                        <option value={EDoctorLevel.JUNIOR}>{EDoctorLevel.JUNIOR}</option>
                                        <option value={EDoctorLevel.MIDLLE}>{EDoctorLevel.MIDLLE}</option>
                                        <option value={EDoctorLevel.SENIOR}>{EDoctorLevel.SENIOR}</option>
                                    </Field>
                                </div>
                            </div>                                                        
                            : null}
                        {touched.role && errors.role ? <p className={styles.typeError}>{errors.role}</p> : <p className={styles.typeText}></p>}
                        <Field hidden type="text" name="role" className={styles.LoginInput} value={props.role} />
                        <Btn disabled={!isValid} title="Создать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default RegisterUser;