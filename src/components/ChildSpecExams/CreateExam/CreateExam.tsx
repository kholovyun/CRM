import { FunctionComponent, ReactElement, useEffect } from "react";
import ICreateExamProps from "./ICreateExamProps";
import { FormBox } from "../../../containers/UserForms/FormBox/FormBox";
import { Field, Form, Formik } from "formik";
import { useCreateExamMutation } from "../../../app/services/specExams";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import { validationSchemaCreateExam } from "../../../schemas/validationSchemaCreateExam";
import styles from "../../ChildAllergies/CreateAllergy/CreateAllergy.module.css";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";

const CreateExam: FunctionComponent<ICreateExamProps> = (props): ReactElement => {
    const [createExam, {
        isSuccess: isSuccessCreateExam,
        isError: isErrorCreateExam,
        error: errorCreateExam
    }] = useCreateExamMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorCreateExam && errorHandler(errorCreateExam);
    }, [isErrorCreateExam]);

    useEffect(() => {
        isSuccessCreateExam && toast.info("Создана новая запись об осмотре другими врачами");
    }, [isSuccessCreateExam]);


    return (
        <FormBox>
            <Formik
                initialValues={{
                    childId: props.childId,
                    specialist: "",
                    name: "",
                    date: new Date(),
                    conclusion: "",
                    recommend: ""
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    createExam(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateExam}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form>
                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.specialist && errors.specialist ? <p>{errors.specialist}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Специальность	</p>
                                <Field className={styles.createAllergyInput} name="specialist" type="text" />
                            </div>
                            <div className={styles.createAllergyField}>
                                {touched.date && errors.date ? <p>{}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Дата</p>
                                <Field className={styles.createAllergyInput} name="date" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.name && errors.name ? <p>{errors.name}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>ФИО врача</p>
                                <Field className={styles.createAllergyInput} name="name" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.conclusion && errors.conclusion ? <p>{errors.conclusion}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Заключение</p>
                                <Field className={styles.createAllergyInput} name="conclusion" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.recommend && errors.recommend ? <p>{errors.recommend}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Рекомендации</p>
                                <Field className={styles.createAllergyInput} name="recommend" type="text" />
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

export default CreateExam;