import { FunctionComponent, ReactElement } from "react";
import styles from "./AddChildForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ESex } from "../../../../enums/ESex";
import IAddChildFormProps from "./IAddChildFormProps";
import { validationSec } from "../../../../schemas/validationScremasRegisterParent";

const AddChildForm: FunctionComponent<IAddChildFormProps> = ({parentId}): ReactElement => {
    return (
        <div className={styles.addChildForm}>
            <Formik
                initialValues={{
                    parentId: parentId,
                    name: "",
                    surname: "",
                    patronim: "",
                    dateOfBirth: "",
                    sex: "",
                    height: "",
                    weight: ""
                }}
                onSubmit={(values) => {
                    alert();
                }}
                validateOnBlur
                validationSchema={validationSec}
            >
                <Form>
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
                </Form>
            </Formik>
        </div>
    );
};

export default AddChildForm;