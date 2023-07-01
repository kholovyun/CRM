import { FunctionComponent, ReactElement, useEffect } from "react";
import ICreateAllergyProps from "./ICreateAllergyProps";
import { FormBox } from "../../../containers/UserForms/FormBox/FormBox";
import { Field, Form, Formik } from "formik";
import { useCreateAllergyMutation } from "../../../app/services/allergies";
import { validationSchemaCreateAllergy } from "../../../schemas/validationSchemaCreateAllergy";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import styles from "./CreateAllergy.module.css";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";

const CreateAllergy: FunctionComponent<ICreateAllergyProps> = (props): ReactElement => {
    const [createAllergy, { isError, isSuccess, error: createAllergyError }] = useCreateAllergyMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isError && errorHandler(createAllergyError);
    }, [isError]);

    useEffect(() => {
        isSuccess && toast.info("Создана новая аллергия");
    }, [isSuccess]);

    return (
        <FormBox>
            <Formik
                initialValues={{
                    childId: props.childId,
                    type: "",
                    symptom: "",
                    factors: ""
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    createAllergy(values);
                    resetForm();
                }}
                validationSchema={validationSchemaCreateAllergy}
            >
                {({ isValid, errors, touched, handleSubmit }) => (
                    <Form className={styles.createAllergyForm}>
                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.type && errors.type ? <p>{errors.type}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Вид аллергии</p>
                                <Field className={styles.createAllergyInput} name="type" type="text" />
                            </div>
                            <div className={styles.createAllergyField}>
                                {touched.symptom && errors.symptom ? <p>{errors.symptom}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Симптомы</p>
                                <Field className={styles.createAllergyInput} name="symptom" type="text" />
                            </div>
                        </div>

                        <div className={styles.createAllergyLine}>
                            <div className={styles.createAllergyField}>
                                {touched.factors && errors.factors ? <p>{errors.factors}</p> : <p></p>}
                                <p className={styles.createAllergyFieldTitle}>Провоцирующие факторы</p>
                                <Field className={styles.createAllergyInput} name="factors" type="text" />
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
                                    types={EBtnTypes.button} />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </FormBox>
    );
};

export default CreateAllergy;