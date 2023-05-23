// import React, { useEffect } from "react";
import styles from "../UserForms.module.css";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import MaskedInput from "react-text-mask";
import { validationSchemaRegParrent } from "../../../schemas/validationSchemaRegParrent";
// import { useAppSelector } from "../../app/hooks";
// import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/UI/Container/Container";
import { FormBox } from "../FormBox/FormBox";
import { Title } from "../Title/Title";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";


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
                                <div className={styles.input_flex_column}>
                                    {touched.email && errors.email ? <p className={styles.typeError}>{errors.email}</p> : <p className={styles.typeText}></p>}
                                    <Field className={styles.LoginInput} name="email" type="text" placeholder="Email" />
                                </div>
                                <Field hidden readOnly={true} className={styles.LoginInput} name="doctorId" type="text" placeholder="ID Врача" />
                            </div>
                            <div className={styles.margin_bottom}></div>
                            {/* {touched.doctorId && errors.doctorId ? <p className={styles.typeError}>{errors.doctorId}</p> : <p className={styles.typeText}></p>} */}
                            <Btn disabled={!isValid} title="Создать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} />
                        </Form>
                    )}
                </Formik>
            </FormBox>
        </Container>
    );
};

export default RegisterParent;