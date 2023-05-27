import styles from "../UserForms.module.css";
import { Formik, Field, Form, FormikConfig, FormikValues } from "formik";
import { toast } from "react-toastify";
import MaskedInput from "react-text-mask";
import { validationSchemaRegParrent } from "../../../schemas/validationSchemaRegParrent";
import { Container } from "../../../components/UI/Container/Container";
import { Title } from "../Title/Title";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { IParrentRegProps } from "./IParrentRegProps";
import React, { useState } from "react";


const RegisterParent: React.FunctionComponent<IParrentRegProps> = (props): React.ReactElement => {
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

    return (
        <Container>
            <div className={styles.form_box_parent}>
                <Title text="Регистрация родителя пациента" />
                <FormikStepper
                    initialValues={{
                        role: ERoles.PARENT,
                        email: "",
                        phone: "",
                        name: "",
                        surname: "",
                        patronim: "",
                        doctorId: props!.doctorId,
                        child: {
                            name: "",      
                            surname: "",
                            patronim: "",
                            dateOfBirth: "",
                            sex: "",
                            height: 0,
                            weight: 0
                        }
                    }}
                    validateOnBlur
                    onSubmit={(values) => {
                        console.log(values);
                        toast.info("Данные корректны");
                    }}
                    validationSchema={validationSchemaRegParrent}
                >
                    <FormikStep label="1">
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
                                <Field className={styles.LoginInput} name="name" type="text" placeholder="Имя" />
                            </div>
                            <div className={styles.input_flex_column}>
                                <Field className={styles.LoginInput} name="surname" type="text" placeholder="Фамилия" />
                            </div>
                        </div>
                        <Field className={styles.LoginInput} name="patronim" type="text" placeholder="Отчество" />                            
                        <div className={styles.two_inputs_row}>
                            <div className={styles.input_flex_column}>
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
                                            onChange={() => console.log(1)}
                                            className={styles.LoginInput}
                                        />
                                    )}
                                >
                                </Field>
                            </div>
                            <div className={styles.input_flex_column}>
                                <Field className={styles.LoginInput} name="email" type="text" placeholder="Email" />
                            </div>
                            <Field hidden readOnly={true} className={styles.LoginInput} name="doctorId" type="text" placeholder="ID Врача" />
                        </div>
                    </FormikStep>
                    <FormikStep label="2">
                        <div className={styles.margin_bottom}>

                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <Field className={styles.LoginInput} name="child.name" type="text" placeholder="Имя" />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <Field className={styles.LoginInput} name="child.surname" type="text" placeholder="Фамилия" />
                                </div>
                            </div>
                            <Field className={styles.LoginInput} name="child.patronim" type="text" placeholder="Отчество" />  
                            <div className={styles.two_inputs_row}>
                                <div className={styles.input_flex_column}>
                                    <Field name="name" type="text" 
                                        render={({ ...field }) => (
                                            <MaskedInput
                                                className={styles.date_input}
                                                {...field}
                                                mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
                                                id="phone"
                                                placeholder="_ _  .  _ _  .  _ _ _ _"
                                                type="text"
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <Field className={styles.LoginInput} name="child.sex" type="text" placeholder="Пол" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Рост</p>
                                    <Field className={styles.LoginInput} name="child.height" type="number" placeholder="Рост" />
                                </div>
                                <div>
                                    <p>Вес</p>
                                    <Field className={styles.LoginInput} name="child.weight" type="number" placeholder="Вес" />
                                </div>
                                
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
            <Form className={styles.parentForm} autoComplete="off">

                {currentChild}

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
            </Form>
        </Formik>
    );
}

export default RegisterParent;