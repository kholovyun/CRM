import styles from "../UserForms.module.css";
import { Formik, Field, Form, FormikConfig, FormikValues, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import MaskedInput from "react-text-mask";
import { Container } from "../../../components/UI/Container/Container";
import { Title } from "../Title/Title";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useEffect, Children, FunctionComponent, ReactElement, ReactNode, useState } from "react";
import { ESex } from "../../../enums/ESex";
import { ESubscriptionType } from "../../../enums/ESubscriptionType";
import { EPaymentType } from "../../../enums/EPaymentType";
import { useCreateUserParentMutation } from "../../../app/services/users";
import { KGMask } from "../../../helpers/countryRegexs";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import IUserCreateParentWithChildDto from "../../../interfaces/IUser/IUserCreateParentWithChildDto";
import { validationFirst, validationSec } from "../../../schemas/validationScremasRegisterParent";
import { FormikStepProps } from "./IFormikInterface";
import { FormBox } from "../FormBox/FormBox";
import { EBtnClass } from "../../../enums/EBtnClass";
import { useParams } from "react-router-dom";

const RegisterParent: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const [doctorId, setDoctorId] = useState<{ doctorId: string }>({ doctorId: String(params.id) });
    const [createUserParent, { isError, isSuccess, error: createUserParentError }] = useCreateUserParentMutation();

    useEffect(() => {
        setDoctorId({ doctorId: String(params.id) });
    }, []);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    const successHandler = () => {
        toast.info("Пользователь успешно создан");
    };

    isError && errorHandler(createUserParentError);
    isSuccess && successHandler();

    return (
        <Container>
            <FormBox>
                <FormikStepper
                    initialValues={{
                        role: ERoles.PARENT,
                        email: "",
                        phone: "87074144093",
                        name: "",
                        surname: "",
                        patronim: "",
                        doctorId: doctorId.doctorId,
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
                    onSubmit={(values: FormikValues) => {
                        console.log(values);
                        createUserParent(values as IUserCreateParentWithChildDto);
                    }}
                >
                    <FormikStep label="1" validationSchema={validationFirst}>
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="name" component="div" />
                                <Field
                                    className={styles.login_input}
                                    name="name"
                                    type="text"
                                    placeholder="Имя" />
                            </div>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="surname" component="div" /><Field
                                    className={styles.login_input}
                                    name="surname"
                                    type="text"
                                    placeholder="Фамилия" />
                            </div>
                        </div>
                        <ErrorMessage className={styles.error_text} name="patronim" component="div" />
                        <Field
                            className={styles.login_input}
                            name="patronim"
                            type="text"
                            placeholder="Отчество" />
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
                                            className={styles.login_input}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className={styles.input_flex_column}>
                                <ErrorMessage className={styles.error_text} name="email" component="div" />
                                <Field
                                    className={styles.login_input}
                                    name="email"
                                    type="text"
                                    placeholder="Email" />
                            </div>
                            <Field
                                hidden readOnly={true}
                                className={styles.login_input}
                                name="doctorId"
                                type="text"
                                placeholder="ID Врача" />
                        </div>
                    </FormikStep>
                    <FormikStep label="2" validationSchema={validationSec}>
                        <div className={styles.form_column}>

                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.name" component="div" />
                                    <Field
                                        className={styles.login_input}
                                        name="child.name"
                                        type="text"
                                        placeholder="Имя" />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.surname" component="div" />
                                    <Field
                                        className={styles.login_input}
                                        name="child.surname"
                                        type="text"
                                        placeholder="Фамилия" />
                                </div>
                            </div>
                            <ErrorMessage className={styles.error_text} name="child.patronim" component="div" />
                            <Field
                                className={styles.login_input}
                                name="child.patronim"
                                type="text"
                                placeholder="Отчество" />
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.dateOfBirth" component="div" />
                                    <Field name="child.dateOfBirth" type="date" className={styles.login_input} />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.sex" component="div" />
                                    <div className={styles.select_wrapper}>
                                        <Field
                                            as="select"
                                            className={styles.custom_select}
                                            name="child.sex"
                                            placeholder="Пол"
                                            id="sex"
                                            default=""
                                        >
                                            <option className={styles.custom_option} value="" disabled hidden>Пол</option>
                                            <option className={styles.custom_option} value={ESex.FEMALE}>{ESex.FEMALE}</option>
                                            <option className={styles.custom_option} value={ESex.MALE}>{ESex.MALE}</option>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.height" component="div" />
                                    <div className={styles.text_select_box}>
                                        <div className={styles.select_wrapper}>
                                            <Field
                                                className={styles.num_input}
                                                name="child.height"
                                                type="number"
                                                placeholder="Рост" />
                                        </div>
                                        <p className={styles.label_text}>см</p>
                                    </div>
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="child.weight" component="div" />
                                    <div className={styles.text_select_box}>
                                        <div className={styles.select_wrapper}>
                                            <Field
                                                className={styles.num_input}
                                                name="child.weight"
                                                type="number"
                                                placeholder="Вес" />
                                        </div>
                                        <p className={styles.label_text}>кг</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormikStep>
                    <FormikStep label="3">
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_subscribe_column}>
                                <label htmlFor={"subsribe"} className={styles.label_text}>Тип подписки</label>
                                <div className={styles.select_wrapper}>
                                    <Field
                                        as="select"
                                        className={styles.custom_select}
                                        name="subscrType"
                                        id="subsribe"
                                    >
                                        <option className={styles.custom_option} value={ESubscriptionType.MOUNTH}>{ESubscriptionType.MOUNTH} месяц</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.HALF_YEAR}>{ESubscriptionType.HALF_YEAR} месяцев</option>
                                        <option className={styles.custom_option} value={ESubscriptionType.YEAR}>год</option>
                                    </Field>
                                </div>
                            </div>
                            <div className={styles.input_subscribe_column}>
                                <label htmlFor={"payment"} className={styles.label_text}>Способ оплаты</label>
                                <div className={styles.select_wrapper}>
                                    <Field
                                        as="select"
                                        className={styles.custom_select}
                                        name="paymentType"
                                        id="payment"
                                    >
                                        <option className={styles.custom_option} value={EPaymentType.AQUIR}>{EPaymentType.AQUIR}</option>
                                        <option className={styles.custom_option} value={EPaymentType.CASH}>{EPaymentType.CASH}</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </FormikStep>
                </FormikStepper>
            </FormBox>
        </Container>
    );
};

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = Children.toArray(children as ReactNode) as ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];

    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    function TitlePicker() {
        if (step === 0)
            return "Регистрация родителя пациента";
        else if (step === 1)
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
            <Form className={styles.form_column}>
                <Title text={TitlePicker()} />
                {currentChild}
                <div className={styles.two_inputs_row}>
                    {step > 0 ? (
                        <Btn
                            onclick={() => setStep((s) => s - 1)}
                            title="Назад"
                            size={EBtnSize.small}
                            btnClass={EBtnClass.white_active}
                        />
                    ) : null}
                    <Btn
                        types={EBtnTypes.submit}
                        title={isLastStep() ? "Создать" : "Продолжить"}
                        size={EBtnSize.small}
                        btnClass={EBtnClass.dark_active}
                    />
                </div>
            </Form>
        </Formik>
    );
}

export default RegisterParent;