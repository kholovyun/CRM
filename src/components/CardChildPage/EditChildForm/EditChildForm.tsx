import { FunctionComponent, ReactElement } from "react";
import styles from "./EditChildForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import IEditFormProps from "./IEditFormProps";
import { useEditChildMutation } from "../../../app/services/children";
import successHandler from "../../../helpers/successHandler";
import errorHandler from "../../../helpers/errorHandler";
import IChildUpdateDto from "../../../interfaces/IChild/IChildUpdateDto";
import { validationScremasCreateChild } from "../../../schemas/validationScremasCreateChild";
import { ESex } from "../../../enums/ESex";
import Btn from "../../UI/Btn/Btn";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnClass } from "../../../enums/EBtnClass";

const EditChildForm: FunctionComponent<IEditFormProps> = ({childData}): ReactElement => {
    
    const [updateChild, {isSuccess, isError, error}] = useEditChildMutation();
    successHandler(isSuccess, "Данные ребенка изменены");
    errorHandler(isError, error);

    const submitHandler = async (values: IChildUpdateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        updateChild({id: childData.id, child: formData}); 
    };

    return (
        <div className={styles.editChildForm}>
            <Formik
                initialValues={{
                    name: childData.name,
                    surname: childData.surname,
                    patronim: childData.patronim,
                    dateOfBirth: childData.dateOfBirth,
                    sex: childData.sex,
                    height: childData.height,
                    weight: childData.weight,
                }}
                onSubmit={ async (values) => {
                    await submitHandler(values);
                }}
                validateOnBlur
                validationSchema={validationScremasCreateChild}
            >
                {({ handleSubmit }) => (
                    <Form>
                        <div className={styles.form_column}>
                            <h1 className={styles.titleTxt}>Добавить ребенка</h1>
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
                                    <ErrorMessage className={styles.error_text} name="surname" component="div" />
                                    <Field
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
                                    <ErrorMessage className={styles.error_text} name="dateOfBirth" component="div" />
                                    <Field 
                                        name="dateOfBirth" 
                                        type="date" 
                                        className={styles.login_input} />
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="sex" component="div" />
                                    <div className={styles.select_wrapper}>
                                        <Field
                                            as="select"
                                            className={styles.custom_select}
                                            name="sex"
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
                                    <ErrorMessage className={styles.error_text} name="height" component="div" />
                                    <div className={styles.text_select_box}>
                                        <div className={styles.select_wrapper}>
                                            <Field
                                                className={styles.num_input}
                                                name="height"
                                                type="number"
                                                min="0"
                                                placeholder="Рост" />
                                        </div>
                                        <p className={styles.label_text}>см</p>
                                    </div>
                                </div>
                                <div className={styles.input_flex_column}>
                                    <ErrorMessage className={styles.error_text} name="weight" component="div" />
                                    <div className={styles.text_select_box}>
                                        <div className={styles.select_wrapper}>
                                            <Field
                                                className={styles.num_input}
                                                name="weight"
                                                type="number"
                                                min="0"
                                                placeholder="Вес" />
                                        </div>
                                        <p className={styles.label_text}>кг</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Btn
                                types={EBtnTypes.submit}
                                title={"Сохранить"}
                                size={EBtnSize.big}
                                btnClass={EBtnClass.dark_active}
                                onclick={handleSubmit}
                            />
                               
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditChildForm;