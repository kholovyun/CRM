import { FunctionComponent, ReactElement } from "react";
import IEditPriceFormProps from "./IEditPriceFormProps";
import { FormBox } from "../../../../../UserForms/FormBox/FormBox";
import { Formik, Field, Form } from "formik";
import { useChangeDoctorPriceMutation } from "../../../../../../app/services/doctors";
import errorHandler from "../../../../../../helpers/errorHandler";
import tableStyles from "../../../AllTables.module.css";
import styles from "../../../../../UserForms/UserForms.module.css";
import { EDoctorLevel } from "../../../../../../enums/EDoctorLevel";
import Btn from "../../../../../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../../../../../enums/EBtnTypes";
import { EBtnSize } from "../../../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../../../enums/EBtnClass";

const EditPriceForm: FunctionComponent<IEditPriceFormProps> = (props: IEditPriceFormProps): ReactElement => {
    const [changeDoctorPrice, { error: changePriceError, isError: isChangePriceError }] = useChangeDoctorPriceMutation();
    errorHandler(isChangePriceError, changePriceError);

    return (
        <FormBox>
            <Formik
                initialValues={{
                    price: props.doctor.price
                }}
                validateOnBlur
                onSubmit={(values) => {
                    changeDoctorPrice({ id: props.doctor.id, obj: {price: String(values.price)} });
                }}
            >
                {({ handleSubmit }) => (
                    <Form className={styles.form_column}>
                        <div className={tableStyles.title_box}>
                            <p className={tableStyles.modal_title}>Отредактировать базовую цену подписки у врача</p>
                            <p className={tableStyles.violet}>{props.doctor.users.surname} {props.doctor.users.name}?</p>
                        </div>
                        <div className={styles.input_column}>
                            <label htmlFor={"price"} className={styles.label_text}>Базовая цена подписки</label>
                            <div className={styles.input_flex_column}>
                                <div className={styles.select_wrapper}>                                    
                                    <Field className={styles.custom_select} id={"price"} name="price" as="select" placeholder="Уровень цены">
                                        <option className={styles.custom_option} value={EDoctorLevel.JUNIOR}>{EDoctorLevel.JUNIOR}</option>
                                        <option className={styles.custom_option} value={EDoctorLevel.MIDLLE}>{EDoctorLevel.MIDLLE}</option>
                                        <option className={styles.custom_option} value={EDoctorLevel.SENIOR}>{EDoctorLevel.SENIOR}</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.added_margin_top} ${styles.btn_group}`}>
                            <Btn title="Закрыть" 
                                types={EBtnTypes.reset}    
                                onclick={props.closeModal} 
                                size={EBtnSize.small} btnClass={EBtnClass.white_active} />
                            <Btn 
                                title="Сохранить"
                                onclick={handleSubmit}
                                size={EBtnSize.small}
                                types={EBtnTypes.submit}
                                btnClass={EBtnClass.dark_active} />
                        </div>
                    </Form>
                )}
            </Formik>
        </FormBox>
    );
};

export default EditPriceForm;