import { Formik, Field, Form } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { useEditUserMutation } from "../../../app/services/users";
import { useAppSelector } from "../../../app/hooks";
import { validationSchemaEditUser } from "../../../schemas/validationSchemaEditUser";
import styles from "./EditDoctorBlock.module.css";
import MaskedInput from "react-text-mask";
import { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import IEditDoctorBlockProps from "./EditDoctorBlockProps";
import IDoctorUpdateDto from "../../../interfaces/IDoctor/IDoctorUpdateDto";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import { useEditDoctorMutation } from "../../../app/services/doctors";

const EditDoctorBlock: FunctionComponent<IEditDoctorBlockProps> = ({modalCloser, doctorData}): ReactElement => {
    const phoneNumberMask = ["+","7","(",/\d/,/\d/,/\d/,")",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/];
    const { user } = useAppSelector(state => state.auth);
    
    const [editUser, { 
        isError: isErrorEditUser, 
        isSuccess: isSuccesEditUser, 
        error: errorEditUser,
        reset: resetEditUser
    }] = useEditUserMutation();

    const [editDoctor, { 
        isError: isErrorEditDoctor, 
        isSuccess: isSuccesEditDoctor, 
        error: errorEditDoctor,
        reset: resetEditDoctor
    }] = useEditDoctorMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    isErrorEditUser && errorHandler(errorEditUser);
    isErrorEditDoctor && errorHandler(errorEditDoctor);
    
    if (isSuccesEditUser) {
        resetEditUser();
        toast.info("Личные данные изменены");
    }
    if (isSuccesEditDoctor) {
        resetEditDoctor();
        toast.info("Специальные данные изменены");
    }
    const updateDoctorData = async (values: IDoctorUpdateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        editDoctor({id: doctorData?.id || "", doctor: formData}); 
    };

    const focusRef = useRef<HTMLInputElement>(null);

    const toggleTab = (index: number) => {
        if (focusRef.current) focusRef.current.focus();
        setToggleState(index);
    };

    const [toggleState, setToggleState] = useState(1);

    return (
        <div className={styles.editFormBox}>
            <div className={styles.editFormBoxTabs}>
                <div 
                    className={toggleState === 1 ? `${styles.tab} ${styles.leftTab} ${styles.activeTab}` : `${styles.tab} ${styles.leftTab}`}
                    onClick={() => toggleTab(1)}
                >Специальная информация</div>
                <div 
                    className={toggleState === 2 ? `${styles.tab} ${styles.rightTab} ${styles.activeTab}` : `${styles.tab} ${styles.rightTab}`}
                    onClick={() => toggleTab(2)}
                >Личные данные</div>
            </div>
            <div className={styles.tabsContent}>
                <div className={toggleState === 2 ? `${styles.content} ${styles.activeContent}` : styles.content}>
                    <Formik
                        initialValues={{
                            name: user!.name,
                            surname: user!.surname,
                            patronim: user!.patronim,
                            phone: user!.phone,
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            editUser({ id: user!.id, userDto: values });
                        }}
                        validationSchema={validationSchemaEditUser}
                    >
                        {({isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                            <Form className={styles.editUserForm}>
                                <div className={styles.editUserLine}>
                                    <div className={styles.editUserField}>
                                        {touched.surname && errors.surname ? <p>{errors.surname}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Фамилия</p>
                                        <Field className={styles.editUserInput} name="surname" type="text" /> 
                                    </div>
                                </div>

                                <div className={styles.editUserLine}>
                                    <div className={styles.editUserField}>
                                        {touched.name && errors.name ? <p>{errors.name}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Имя</p>
                                        <Field className={styles.editUserInput} name="name" type="text" /> 
                                    </div>
                                    <div className={styles.editUserField}>
                                        {touched.patronim && errors.patronim ? <p>{errors.patronim}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Отчество</p>
                                        <Field className={styles.editUserInput} name="patronim" type="text" /> 
                                    </div>   
                                </div>
                            
                                <div className={styles.editUserLine}>
                                    <div className={styles.editUserField}>
                                        {touched.phone && errors.phone ? <p>{errors.phone}</p> : <p></p>}
                                        <p className={styles.editUserFieldTitle}>Тел.</p>
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
                                                    className={styles.editUserInput} />
                                            )}
                                        >
                                        </Field>   
                                    </div> 
                                    <div className={styles.saveButton}>
                                        <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                                    </div>
                                </div>      
                            </Form>
                        )}
                    </Formik>
                </div>
                
                <div className={toggleState === 1 ? `${styles.content} ${styles.activeContent}` : styles.content}>
                    <Formik
                        initialValues={{
                            degree: doctorData.degree,
                            experience: doctorData.experience,
                            placeOfWork: doctorData.placeOfWork,
                            achievements: doctorData.achievements,
                            speciality: doctorData.speciality
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            updateDoctorData(values);
                        }}
                    
                    >
                        {({handleSubmit }) => (
                            <Form className={styles.editDoctorForm}>
                                <div className={styles.editDoctorLine}>
                                    <div className={styles.editDoctorField}>
                                        <p className={styles.editDoctorFieldTitle}>Специальность</p>
                                        <Field innerRef={focusRef} className={styles.editDoctorInput} name="speciality" type="text"/>
                                    </div>
                                    <div className={styles.editDoctorField}>
                                        <p className={styles.editDoctorFieldTitle}>Степень</p>
                                        <Field className={styles.editDoctorInput} name="degree" type="text"/>
                                    </div>   
                                </div>
                                <div className={styles.editDoctorLine}>
                                    <div className={styles.editDoctorFieldExpreience}>
                                        <p className={styles.editDoctorFieldTitle}>Стаж</p>
                                        <Field className={styles.editDoctorInput} name="experience" min="0" max="100" type="number"/>
                                    </div> 
                                    <div className={styles.editDoctorField}>
                                        <p className={styles.editDoctorFieldTitle}>Место работы</p>
                                        <Field className={styles.editDoctorInput} name="placeOfWork" type="text"/>
                                    </div>       
                                </div>
                    
                                <div className={styles.editDoctorLine}>
                                    <div className={styles.editDoctorField}>
                                        <p className={styles.editDoctorFieldTitle}>Достижения</p>
                                        <Field className={styles.editDoctorInput} name="achievements" type="text"/>
                                    </div> 
                                    <div className={styles.saveButton}>
                                        <Btn title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                                    </div>    
                                </div>
                            </Form>
                            
                        )}
                        
                    </Formik>
                </div>
                <Btn title="Закрыть" onclick={modalCloser} size={EBtnSize.tiny} types={EBtnTypes.submit} />
            </div>
            
        </div>
    );
};

export default EditDoctorBlock;