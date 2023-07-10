import { FunctionComponent, ReactElement, useEffect } from "react";
import ICreateVaccinationProps from "./ICreateVaccinationProps";
import { FormBox } from "../../../containers/UserForms/FormBox/FormBox";
import { Field, Form, Formik } from "formik";
import { useCreateVaccinationMutation } from "../../../app/services/vaccinations";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import styles from "./CreateVaccination.module.css";
import { validationSchemaCreateVaccination } from "../../../schemas/validationSchemaCreateVaccination";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";


const CreateVaccination: FunctionComponent<ICreateVaccinationProps> = (props): ReactElement => {
    const [createVaccination, {
        isSuccess: isSuccessCreateVaccination,
        isError: isErrorCreateVaccination,
        error: errorCreateVaccination
    }] = useCreateVaccinationMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorCreateVaccination && errorHandler(errorCreateVaccination);
    }, [isErrorCreateVaccination]);

    useEffect(() => {
        isSuccessCreateVaccination && toast.info("Создана новая запись о вакцине");
    }, [isSuccessCreateVaccination]);
    
    return (
        <FormBox>
            <Formik
                initialValues={{
                    childId: props.childId,
                    infection: "",
                    vaccine: "",
                    age: "",
                    date: new Date(),
                    dose: "",
                    serial: "",
                    manufacturer: "",
                    reaction: "",
                    conterindication: "",
                    notes: ""
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    createVaccination(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateVaccination}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form>
                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.infection && errors.infection ? <p>{errors.infection}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Вид инфекции</p>
                                <Field className={styles.createAllergyInput} name="infection" type="text" />
                            </div>
                            <div className={styles.createAllergyField}>
                                {touched.vaccine && errors.vaccine ? <p>{errors.vaccine}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Вид вакцины</p>
                                <Field className={styles.createAllergyInput} name="vaccine" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.age && errors.age ? <p>{errors.age}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Возраст ребенка</p>
                                <Field className={styles.createAllergyInput} name="age" type="text" />
                            </div>
                            <div className={styles.createAllergyField}>
                                {touched.date && errors.date ? <p>{}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Дата</p>
                                <Field className={styles.createAllergyInput} name="date" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.manufacturer && errors.manufacturer ? <p>{errors.manufacturer}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Производитель</p>
                                <Field className={styles.createAllergyInput} name="manufacturer" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.dose && errors.dose ? <p>{errors.dose}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Доза</p>
                                <Field className={styles.createAllergyInput} name="dose" type="text" />
                            </div>
                            <div className={styles.createAllergyField}>
                                {touched.serial && errors.serial ? <p>{errors.serial}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Серия</p>
                                <Field className={styles.createAllergyInput} name="serial" type="text" />
                            </div>
                        </div>

                        
                        <div className={styles.btnBlock}>
                            <div className={styles.saveButton}>
                                <Btn
                                    disabled={!isValid}
                                    title="Создать"
                                    size={EBtnSize.tiny}
                                    types={EBtnTypes.submit}
                                    onclick={handleSubmit} />
                            </div>
                            <div className={styles.closeButton}>
                                <Btn
                                    onclick={props.modalCloser}
                                    title="Закрыть"
                                    size={EBtnSize.tiny}
                                    types={EBtnTypes.reset} />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default CreateVaccination;