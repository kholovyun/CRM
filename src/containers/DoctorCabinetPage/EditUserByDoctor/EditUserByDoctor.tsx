import { Field, Form, Formik } from "formik";
import { FunctionComponent, ReactElement } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../app/hooks";
import { FormBox } from "../../UserForms/FormBox/FormBox";
import { Title } from "../../UserForms/Title/Title";
import { validationSchemaRegUser } from "../../../schemas/validationSchemaRegUser";
import styles from "./EditUserByDoctor.module.css";
import MaskedInput from "react-text-mask";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";

const EditUserByDoctor: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const phoneNumberMask = ["+","7",/\d/,/\d/,/\d/,")",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/];
    
    return (
        <FormBox>
            <Title text={"Изменить данные пользователя"} />
            <Formik
                initialValues={{
                    name: user?.name,
                    surname: user?.surname,
                    patronim: user?.patronim,
                    phone: user?.phone,
                }}
                validateOnBlur
                onSubmit={() => {
                    toast.info("Пока еще не доступно");
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
                                            value={user?.phone}
                                        />
                                    )}
                                >
                                </Field>
                            </div>   
                        </div>
                        <Btn disabled={!isValid} title="Редактировать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default EditUserByDoctor;