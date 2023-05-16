// import React, { useEffect } from "react";
import styles from "../Login/Login.module.css";
import { Formik, Field, Form } from "formik";
import { ERoles } from "../../enums/ERoles";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { toast } from "react-toastify";
import MaskedInput from "react-text-mask";
import { FormBox } from "../../components/UI/FormBox/FormBox";
import { Title } from "../../components/UI/Title/Title";
import { validationSchemaRegParrent } from "../../schemas/validationSchemaRegParrent";
// import { useAppSelector } from "../../app/hooks";
// import { useNavigate } from "react-router-dom";
import { Container } from "../../components/UI/Container/Container";


const RegisterParent: React.FunctionComponent = (): React.ReactElement => {
    // const { doctorId } = useAppSelector(state => state.doctor);
    // const navigator = useNavigate();
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

    // useEffect(() => {
    //     doctorId === null && navigator("/");
    // }, []);

    return (
        <Container>
            <FormBox>
                <Title text="Регистрация родителя пациента" />
                <Formik
                    initialValues={{
                        name: "",
                        surname: "",
                        patronim: "",
                        phone: "",
                        email: "",
                        // doctorId: doctorId || "",
                        role: ERoles.PARENT
                    }}
                    validateOnBlur
                    onSubmit={(values) => {
                        console.log(values);
                        toast.info("Данные корректны");
                    }}
                    validationSchema={validationSchemaRegParrent}
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
                            <Field hidden readOnly={true} className={styles.LoginInput} name="doctorId" type="text" placeholder="ID Врача" />
                            {/* {touched.doctorId && errors.doctorId ? <p className={styles.typeError}>{errors.doctorId}</p> : <p className={styles.typeText}></p>} */}
                            <Btn disabled={!isValid} title="Создать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default RegisterParent;