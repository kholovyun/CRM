import styles from "../UserForms.module.css";
import * as Yup from "yup";
import { Formik, Field, Form, FormikConfig, FormikValues , ErrorMessage} from "formik";
import { toast } from "react-toastify";
import MaskedInput from "react-text-mask";
import { Container } from "../../../components/UI/Container/Container";
import { Title } from "../Title/Title";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { IParrentRegProps } from "./IParrentRegProps";
import React, { useState } from "react";
import { ESex } from "../../../enums/ESex";
import { ESubscriptionType } from "../../../enums/ESubscriptionType";
import { EPaymentType } from "../../../enums/EPaymentType";
import { useCreateUserParentMutation } from "../../../app/services/users";
import { KGMask} from "../../../helpers/countryRegexs";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";


const RegisterParent: React.FunctionComponent<IParrentRegProps> = (props): React.ReactElement => {
    const [createUserParent, { isError, isSuccess, error: createUserParentError }] = useCreateUserParentMutation();
    
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    const successHandler = () => {
        toast.info("Пользователь успешно создан");
    };

    isError && errorHandler(createUserParentError);
    isSuccess && successHandler();

    const validationFirst = Yup.object().shape({
        name: Yup.string().required("Поле 'Имя' обязательно для заполнения"),
        surname: Yup.string().required("Поле 'Фамилия' обязательно для заполнения"),
        email: Yup.string().required("Поле 'Email' обязательно для заполнения").email("Некорректный формат Email"),
        phone: Yup.string().required("Поле 'Телефон' обязательно для заполнения")
    });
    const validationSec = Yup.object().shape({
        child: Yup.object().shape({
            name: Yup.string().required("Поле 'Имя ребенка' обязательно для заполнения"),
            surname: Yup.string().required("Поле 'Фамилия ребенка' обязательно для заполнения"),
            patronim: Yup.string().required("Поле 'Отчество ребенка' обязательно для заполнения"),
            dateOfBirth: Yup.string().required("Поле 'Дата рождения ребенка' обязательно для заполнения"),
            sex: Yup.string().required("Поле 'Пол ребенка' обязательно для заполнения"),
            height: Yup.number().required("Поле 'Рост ребенка' обязательно для заполнения"),
            weight: Yup.number().required("Поле 'Вес ребенка' обязательно для заполнения").nonNullable(),
        }),
    });


    return (
        <Container>
            <div className={styles.form_box_parent}>
                <FormikStepper
                    initialValues={{
                        role: ERoles.PARENT,
                        email: "",
                        phone: "87074144093",
                        name: "",
                        surname: "",
                        patronim: "",
                        doctorId: props.doctorId,
                        paymentType: "",
                        subscrType: "",
                        child: {
                            name: "",      
                            surname: "",
                            patronim: "",
                            dateOfBirth: "",
                            sex: "",
                            height: "",
                            weight: ""
                        }
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        createUserParent(values);
                    }}
                >
                    <FormikStep label="1" validationSchema = {validationFirst}>
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <Field 
                                    className={styles.LoginInput} 
                                    name="name" 
                                    type="text" 
                                    placeholder="Имя" />
                                <ErrorMessage name="name" component="div"/>
                            </div>
                            <div className={styles.input_flex_column}>
                                <Field 
                                    className={styles.LoginInput} 
                                    name="surname" 
                                    type="text" 
                                    placeholder="Фамилия" />
                                <ErrorMessage name="surname" component="div"/>
                            </div>
                        </div>
                        <Field 
                            className={styles.LoginInput} 
                            name="patronim" 
                            type="text" 
                            placeholder="Отчество" />
                        <ErrorMessage name="patronim" component="div"/>                            
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <Field
                                    name="phone"
                                    type="text"
                                >
                                    {({ ...field }) => (
                                        <MaskedInput
                                            {...field}
                                            mask={KGMask}
                                            id="phone"
                                            type="text"
                                            placeholder="+996(___)__-__-__"
                                            className={styles.LoginInput}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className={styles.input_flex_column}>
                                <Field 
                                    className={styles.LoginInput} 
                                    name="email" 
                                    type="text" 
                                    placeholder="Email" />
                                <ErrorMessage name="email" component="div"/>
                            </div>
                            <Field 
                                hidden readOnly={true}
                                className={styles.LoginInput} 
                                name="doctorId"
                                type="text" 
                                placeholder="ID Врача" />
                        </div>
                    </FormikStep>
                    <FormikStep label="2" validationSchema={validationSec}>
                        <div className={styles.parentForm}>

                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <Field 
                                        className={styles.LoginInput}
                                        name="child.name" 
                                        type="text" 
                                        placeholder="Имя" />
                                    <ErrorMessage name="child.name" component="div"/>
                                </div>
                                <div className={styles.input_flex_column}>
                                    <Field 
                                        className={styles.LoginInput} 
                                        name="child.surname" 
                                        type="text" 
                                        placeholder="Фамилия" />
                                    <ErrorMessage name="child.surname" component="div"/>
                                </div>
                            </div>
                            <Field 
                                className={styles.LoginInput} 
                                name="child.patronim" 
                                type="text" 
                                placeholder="Отчество" />
                            <ErrorMessage name="child.patronim" component="div"/>  
                            <div className={styles.input_select_row}>
                                <div className={styles.input_flex_column}>
                                    <Field name="child.dateOfBirth" type="date" className={styles.LoginInput}/>
                                    <ErrorMessage name="child.dateOfBirth" component="div"/>
                                </div>
                                <div className={styles.input_flex_column}>
                                    <Field
                                        as="select" 
                                        className={styles.LoginInput} 
                                        name="child.sex" 
                                        placeholder="Пол"
                                        id="sex"
                                        default=""
                                    >   
                                        <option value="" disabled hidden>Пол</option>
                                        <option value={ESex.FEMALE}>{ESex.FEMALE}</option>
                                        <option value={ESex.MALE}>{ESex.MALE}</option>
                                    </Field>
                                    <ErrorMessage name="child.sex" component="div"/>
                                </div>
                            </div>
                            <div className={styles.form_labels_controlls}>
                                <div className={styles.text_select_box}>
                                    <Field 
                                        className={styles.numInput} 
                                        name="child.height" 
                                        type="number" 
                                        placeholder="Рост" />
                                    <p>см</p>

                                </div>
                                <div className={styles.text_select_box}>
                                    <Field 
                                        className={styles.numInput} 
                                        name="child.weight" 
                                        type="number" 
                                        placeholder="Вес" />
                                    <p>кг</p>
                                </div>               
                            </div>
                            <div>
                                <ErrorMessage name="child.height" component="div"/>
                                <ErrorMessage name="child.weight" component="div"/>
                            </div>  
                        </div>
                    </FormikStep>
                    <FormikStep label="3">
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <p>Тип подписки</p>
                                <Field
                                    as="select" 
                                    className={styles.LoginInput} 
                                    name="subscrType" 
                                    id="subsribe"
                                    default=""
                                >   
                                    <option value="" disabled hidden></option>
                                    <option value={ESubscriptionType.MOUNTH}>{ESubscriptionType.MOUNTH} месяц</option>
                                    <option value={ESubscriptionType.HALF_YEAR}>{ESubscriptionType.HALF_YEAR} месяцев</option>
                                    <option value={ESubscriptionType.YEAR}>год</option>
                                </Field>
                            </div>
                            <div className={styles.input_flex_column}>
                                <p>Способ оплаты</p>
                                <Field
                                    as="select" 
                                    className={styles.LoginInput} 
                                    name="paymentType" 
                                    id="payment"
                                    default=""
                                >   
                                    <option value="" disabled hidden></option>
                                    <option value={EPaymentType.AQUIR}>{EPaymentType.AQUIR}</option>
                                    <option value={EPaymentType.CASH}>{EPaymentType.CASH}</option>
                                </Field>
                            </div>
                        </div>  
                    </FormikStep>     
                </FormikStepper>
            </div>
        </Container>
    );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];

    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    function TitlePicker() {
        if(step === 0)
            return "Регистрация родителя пациента";
        else if(step === 1)
            return "Регистрация пациента";
        else 
            return "Оформление подписки";
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    setStep((s) => s + 1);
                    helpers.setTouched({});
                }
            }}
        >   
            <Form className={styles.parentForm}>
                <Title text={TitlePicker()} />
                {currentChild}
                <div className={styles.form_labels_controlls}>
                    {step > 0 ? (
                        <Btn
                            onclick={() => setStep((s) => s - 1)}
                            title="Назад"
                            btnClass={EBtnSize.small}
                        />

                    ) : null}
                    <Btn
                        types={EBtnTypes.submit}
                        title={isLastStep()? "Создать" : "Продолжить"}
                        btnClass={EBtnSize.small}
                    />

                </div>
            </Form>
            
        </Formik>
    );
}

export default RegisterParent;