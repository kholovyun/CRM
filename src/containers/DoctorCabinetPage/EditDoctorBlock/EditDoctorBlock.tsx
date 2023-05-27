import { Formik, Field, Form } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { useEditUserMutation } from "../../../app/services/users";
import { useAppSelector } from "../../../app/hooks";
import { validationSchemaEditUser } from "../../../schemas/validationSchemaEditUser";
import styles from "./EditDoctorBlock.module.css";
import MaskedInput from "react-text-mask";
import { FunctionComponent, ReactElement } from "react";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import IEditDoctorBlockProps from "./EditDoctorBlockProps";

const EditDoctorBlock: FunctionComponent<IEditDoctorBlockProps> = ({close}): ReactElement => {
    const phoneNumberMask = ["+","7","(",/\d/,/\d/,/\d/,")",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/];
    const [editUser, {isSuccess}] = useEditUserMutation();

    const { user } = useAppSelector(state => state.auth);
    
    const handleSuccessRequest = () => {
        // toast.info("Личные данные изменены");
        close();
    };

    isSuccess && handleSuccessRequest();
    return (
        <div className={styles.editFormBox}>
            <p className={styles.editFormTitle}>Изменить данные пользователя</p>
            <Formik
                initialValues={{
                    name: user!.name,
                    surname: user!.surname,
                    patronim: user!.patronim,
                    phone: user!.phone,
                }}
                validateOnBlur
                onSubmit={(values) => {
                    editUser({id: user!.id, userDto: values});
                }}
                validationSchema={validationSchemaEditUser}
            >
                {({ isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <Form className={styles.editForm}>     
                        <div className={styles.editFormLine}>
                            {touched.name && errors.name ? <p className={styles.typeError}>{errors.name}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="name" type="text" placeholder="Имя" />
                        </div>
                        <div className={styles.editFormLine}>
                            {touched.surname && errors.surname ? <p className={styles.typeError}>{errors.surname}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="surname" type="text" placeholder="Фамилия" />
                        </div>
                        <div className={styles.editFormLine}>
                            {touched.patronim && errors.patronim ? <p className={styles.typeError}>{errors.patronim}</p> : <p className={styles.typeText}></p>}
                            <Field className={styles.LoginInput} name="patronim" type="text" placeholder="Отчество" />
                        </div>
                        
                        <div className={styles.editFormLine}>
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
                        <div className={styles.buttoons}>
                            <Btn title="Отмена" onclick={close} size={EBtnSize.big} types={EBtnTypes.submit} />
                            <Btn disabled={!isValid} title="Редактировать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />
                        </div> 
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditDoctorBlock;