import { FunctionComponent, ReactElement, useState } from "react";
import { Container } from "../../components/UI/Container/Container";
import styles from "./DoctorCabinetPage.module.css";
import { Field, Formik, Form } from "formik";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnSize } from "../../enums/EBtnSize";
import Btn from "../../components/UI/Btn/Btn";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [updateData, setUpdateData] = useState(true);

    return (
        <Container>
            <Formik
                initialValues={{
                    nameSurnamePatronim: `${user?.surname} ${user?.name} ${user?.patronim || ""} `,
                    speciality: "Терапевт",
                    placeOfWork: "Больница №5",
                    experience: "Стаж 20 лет",
                    achievments: "Доктор года"
                }}
                validateOnBlur
                onSubmit={() => {
                    toast.info("Отправлено на модерацию");
                    setUpdateData(true);
                }}
            >
                <div className={styles.DoctorCabinetPage}>
                    <div className={styles.doctorInformationBlock}>
                        <div className={styles.doctorAvatar}>
                            <div className={styles.doctorAvatarAddIcon}></div>
                        </div>
                        <Form className={styles.personalInformation}>
                            <Field readOnly={updateData} type="text" name="nameSurnamePatronim" className={styles.personalInformationInput}/>
                            <div className={styles.personalInformationMiddle}>
                                <Field readOnly={updateData} type="text" name="speciality" className={styles.personalInformationInput}/>
                                <Field readOnly={updateData} type="text" name="achievments" className={styles.personalInformationInput}/>
                            </div>
                            <div className={styles.personalInformationMiddle}>
                                <Field readOnly={updateData} type="text" name="placeOfWork" className={styles.personalInformationInput}/>
                                <Field readOnly={updateData} type="text" name="experience" className={styles.personalInformationInput}/>
                            </div>
                            <div className={styles.editBtn}>
                                <Btn size={EBtnSize.small} types={EBtnTypes.submit} title="Редактировать" />
                            </div>
                        </Form>
                    </div>
                </div>
            </Formik>
            <div className={styles.slider}>
                <p className={styles.sliderTitle}>Сертификаты о дополнительном образовании</p>
            </div>
            
            
        </Container>
        
    );
};

export default DoctorCabinetPage;