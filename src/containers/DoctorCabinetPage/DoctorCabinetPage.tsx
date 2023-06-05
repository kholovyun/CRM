import { FunctionComponent, ReactElement, useState } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnSize } from "../../enums/EBtnSize";
import Btn from "../../components/UI/Btn/Btn";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./DoctorCabinetPage.module.css";
import { useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import Modal from "../../components/UI/Modal/Modal";
import AvatarUploader from "../../components/AvatarUploader/AvatarUploader";
import defaultDoctorImg from "../../assets/img/default-doctor.svg";
import { NavLink, useParams } from "react-router-dom";
import EditDoctorBlock from "./EditDoctorBlock/EditDoctorBlock";
import { ERoles } from "../../enums/ERoles";
import RecommendationsBlock from "./RecommendationsBlock/RecommendationsBlock";
import DiplomasBlock from "./DiplomasBlock/DiplomasBlock";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { user } = useAppSelector(state => state.auth);
    const {data: doctor} = useGetDoctorByUserIdQuery({id: user?.role === ERoles.DOCTOR ? user?.id : String(params.id)});
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);

    const editAvatarModalCloser = () => {
        setShowAvatarModal(false);
    };

    const editPersonalInformationModalCloser = () => {
        setShowEditUserModal(false);
    };

    const ageTextFormat = (number: number) => {  
        const titles = ["год", "года", "лет"];
        const cases = [2, 0, 1, 1, 1, 2];  
        return titles[(number % 100 > 4 && number % 100 < 20) 
            ? 
            2 : cases[(number % 10 < 5) ? number % 10 : 5]];  
    };
    
    return (
        <Container>
            <Modal show={showAvatarModal} close={editAvatarModalCloser}>
                <AvatarUploader 
                    doctor={doctor!}
                    width={250}
                    height={1500}
                    modalCloser={editAvatarModalCloser}
                />
            </Modal>
            
            <Modal show={showEditUserModal} close={editPersonalInformationModalCloser}>
                <EditDoctorBlock 
                    modalCloser={editPersonalInformationModalCloser} 
                    doctorData={doctor!}
                />
            </Modal>

            <div className={styles.doctorInformationBlock}>
                <div className={styles.doctorAvatar}>
                    <div className={styles.backdrop} onClick={() => {setShowAvatarModal(true);}}></div>
                    {doctor?.photo !== undefined ? 
                        <img 
                            className={styles.doctorImage}
                            onError={(e) => { e.currentTarget.src = defaultDoctorImg;}}
                            src={doctor?.photo !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/doctorsImgs/${doctor?.photo}` : defaultDoctorImg} alt={"doctor"}
                        /> : <img className="DetailedPage__image" src={defaultDoctorImg} alt={"doctor"}/>
                    }
                </div>
                <div className={styles.doctorInformation}>
                    <div className={styles.personalInformationLine}>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>ФИО</p>
                            <p className={styles.fieldText}>{doctor?.users.name} {doctor?.users.surname} {doctor?.users.patronim}</p>
                        </div>
                    </div>
                    <div className={styles.personalInformationLine}>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Специальность</p>
                            <p className={styles.fieldText}>{doctor?.speciality}</p>
                        </div>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Степень</p>
                            <p className={styles.fieldText}>{doctor?.degree}</p>
                        </div>
                    </div>
                    <div className={styles.personalInformationLine}>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Стаж</p>
                            <p className={styles.fieldText}>
                                <span>{doctor?.experience} </span>
                                {doctor?.experience && ageTextFormat(doctor.experience)}
                            </p>
                        </div>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Моб.телефон</p>
                            <p className={styles.fieldText}>{doctor?.users.phone}</p>
                        </div>
                    </div>
                    <div className={styles.personalInformationLine}>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Достижения</p>
                            <p className={styles.fieldText}>{doctor?.achievements}</p>
                        </div>
                    </div>
                    <div className={styles.personalInformationLine}>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Место работы</p>
                            <p className={styles.fieldText}>{doctor?.placeOfWork}</p>
                        </div>
                        <div className={styles.personalInformationButton}>
                            <Btn onclick={() => setShowEditUserModal(true)} size={EBtnSize.tiny} types={EBtnTypes.submit} title="Редактировать" />
                        </div>
                    </div>       
                </div>       
            </div>

            {/* <БЛОК СЕРТИФИКАТОВ> */}
            <DiplomasBlock />

            {/* <БЛОК РЕКОМЕНДАЦИИ> */}
            <RecommendationsBlock doctorData={doctor!}/>
            
            {/* ВОПРОСЫ */}
            <div className={styles.questionsBlock}>
                <div className={styles.questionsBlockLeft}>
                    <p className={styles.questionsBlockLeftTop}>Новые вопросы</p>
                </div>
                <div className={styles.questionsBlockRight}>

                </div>
            </div>

            {/* НАВИГАЦИОННЫЙ БЛОК */}

            <div className={styles.navigationBlock}>
                <div className={styles.navLinkBox} onClick={() => {toast.info("Функционал пока недоступен");}}>
                    <p className={styles.navLink}>Вопросы</p>
                    <div className={styles.arrowDown}></div>
                </div>
                <div className={styles.navLinkBox}>
                    <p className={styles.navLink}>Перейти в админ панель</p>
                    <div className={styles.arrowRight}></div>
                </div>
            </div>
        </Container>
        
    );
};

export default DoctorCabinetPage;