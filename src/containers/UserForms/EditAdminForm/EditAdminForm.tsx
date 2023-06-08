import { ChangeEvent, FunctionComponent, ReactElement, useState } from "react";
import styles from "../UserForms.module.css";
import { Formik, Field, Form } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { toast } from "react-toastify";
import { useEditUserMutation } from "../../../app/services/users";
import MaskedInput from "react-text-mask";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { KGMask, KZMask } from "../../../helpers/countryRegexs";
import KGFlag from "../../../assets/img/kg.png";
import INTFlag from "../../../assets/img/icon_international_flag.svg";
import { useAppSelector } from "../../../app/hooks";
import { validationSchemaEditUser } from "../../../schemas/validationSchemaEditUser";
import { useNavigate } from "react-router-dom";

const EditAdminForm: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);
    const [editUser, { 
        isError: isErrorEditUser, 
        isSuccess: isSuccesEditUser, 
        error: errorEditUser,
        reset: resetEditUser
    }] = useEditUserMutation();
    const [phoneMask, setPhoneMask] = useState(user && user.phone.startsWith("+996(") ? KGMask : KZMask);
    const [flag, setFlag] = useState(user && user.phone.startsWith("+996(") ? KGFlag : INTFlag);

    const phoneMaskOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.currentTarget.value) {
        case "KG":
            setPhoneMask(KGMask);
            setFlag(KGFlag);
            break;
        case "INT":
            setPhoneMask(KZMask);
            setFlag(INTFlag);
            break;
        default:
            setPhoneMask(KZMask);
            setFlag(INTFlag);
            break;
        }
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    isErrorEditUser && errorHandler(errorEditUser);

    if (isSuccesEditUser) {
        resetEditUser();
        toast.info("Личные данные изменены");
        navigate("/admin-page/profile");
    }

    return (
        <FormBox>
            <Title text={"Редактировать профиль"} />
            {user ? 
                <Formik
                    initialValues={{
                        name: user.name,
                        surname: user.surname,
                        patronim: user.patronim && user.patronim !== "" ? user.patronim : "",
                        phone: user.phone
                    }}
                    validateOnBlur
                    onSubmit={(values) => {
                        editUser({ id: user.id, userDto: values });
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
                                    <div className={styles.two_inputs_row}>
                                        <div className={styles.select_flag_wrapper}>
                                            <div className={styles.flag_wrapper}><img className={styles.flag_image} src={flag} alt="" /></div>
                                            <div className={styles.select_wrapper}>
                                                <select className={styles.country_select} defaultValue={user && user.phone.startsWith("+996(") ? "KG" : "INT"} onChange={phoneMaskOnChange}>
                                                    <option value={"INT"}>INT</option>
                                                    <option value={"KG"}>KG</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Field
                                            name="phone"
                                            type="text"
                                        >
                                            {({ ...field }) => (
                                                <MaskedInput
                                                    {...field}
                                                    mask={phoneMask}
                                                    id="phone"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={styles.LoginInput}
                                                    defaultValue={user.phone}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </div>                        
                            <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                        </Form>
                    )}
                </Formik>
                : null}
        </FormBox>
    );
};

export default EditAdminForm;