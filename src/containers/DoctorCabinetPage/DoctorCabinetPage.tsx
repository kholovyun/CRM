import { FunctionComponent, ReactElement, useRef, useState } from "react";
import { Container } from "../../components/UI/Container/Container";
import { Field, Formik, Form } from "formik";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnSize } from "../../enums/EBtnSize";
import Btn from "../../components/UI/Btn/Btn";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./DoctorCabinetPage.module.css";
import "./Carousel.css";
import { useEditDoctorMutation, useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import Modal from "../../components/UI/Modal/Modal";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import EditUserByDoctor from "./EditUserByDoctor/EditUserByDoctor";
import defaultDoctorImg from "../../assets/img/default-doctor.svg";
import IDoctorUpdateDto from "../../interfaces/IDoctor/IDoctorUpdateDto";
import { useParams } from "react-router-dom";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { user } = useAppSelector(state => state.auth);
    const {data: doctor} = useGetDoctorByUserIdQuery({id: String(params.id)});
    const [updateData, setUpdateData] = useState(true);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showUserUpadteModal, setShowUserUpadteModal] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const [editDoctor]= useEditDoctorMutation();

    const modalCancelHandler = () => {
        setShowUserUpadteModal(false);
        setShowAvatarModal(false);
    };

    const setInputFocus = () => {
        ref.current?.focus();
    };

    const updateDoctorData = async (values: IDoctorUpdateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        editDoctor({id: doctor?.id || "", doctor:formData});
    };

    return (
        <Container>
            <Modal show={showAvatarModal} close={modalCancelHandler}>
                <UploadAvatar click={() => setShowAvatarModal(false)}/>
            </Modal>
            <Modal show={showUserUpadteModal} close={modalCancelHandler}>
                <EditUserByDoctor />
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
                {doctor && 
                <div className={styles.doctorInformation}>
                    <div className={styles.personalInformation}>
                        <p className={styles.informationTitle}>Личные данные</p>
                        <div className={styles.personalInformationField}>
                            <p>{user?.name} {user?.surname} {user?.patronim}</p>
                        </div>
                        <div className={styles.personalInformationBottom}>
                            <div className={styles.personalInformationField}>
                                <p>{user?.phone}</p>
                            </div>
                            <Btn onclick={() => setShowUserUpadteModal(true)} size={EBtnSize.tiny} types={EBtnTypes.submit} title="Редактировать" />
                        </div>
                    </div>
                    <div className={styles.specialInformation}>
                        <Formik
                            initialValues={{
                                speciality: doctor!.speciality,
                                placeOfWork: doctor!.placeOfWork,
                                experience: doctor!.experience,
                                achievments: doctor!.achievements,
                                degree: doctor!.degree
                            }}
                            validateOnBlur
                            onSubmit={async(values) => {
                                updateDoctorData(values);
                                // toast.info("Функционал пока недоступен");
                                setUpdateData(true);
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Form className={styles.specialInformationForm}>
                                    <p className={styles.informationTitle}>Специальные данные</p>
                                    <div className={styles.specialInformationLine}>
                                        <Field readOnly={updateData} type="text" innerRef={ref} name="speciality" className={`${styles.specialInformationField} ${!updateData && styles.violetBorder}`}/>
                                        <Field readOnly={updateData} type="text" name="degree" className={`${styles.specialInformationField} ${!updateData && styles.violetBorder}`}/>
                                    </div>
                                    <div className={styles.specialInformationLine}>
                                        <Field readOnly={updateData} type="text" name="achievments" className={`${styles.specialInformationField} ${!updateData && styles.violetBorder}`}/>
                                        <Field readOnly={updateData} type="text" name="experience" className={`${styles.specialInformationField} ${!updateData && styles.violetBorder}`}/>
                                    </div>
                                    <div className={styles.specialInformationLine}>
                                        <Field readOnly={updateData} type="text" name="placeOfWork" className={`${styles.specialInformationField} ${!updateData && styles.violetBorder}`}/>
                                        {updateData && <Btn title="Редактировать" onclick={() => {
                                            setUpdateData(false);
                                            setInputFocus();
                                        }} size={EBtnSize.tiny} types={EBtnTypes.submit} />}
                                        {!updateData && <Btn title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                }
            </div>

            <div className={styles.slider}>
                <p className={styles.sliderTitle}>Сертификаты о дополнительном образовании</p>
                <div className={styles.carousel}>
                    <AliceCarousel disableDotsControls responsive={{0: {
                        items: 1, 
                    }, 500: {
                        items: 3,
                        itemsFit: "contain",
                    }, 1000: {
                        items: 5,
                        itemsFit: "contain",
                    }}} items={
                        [
                            <div onClick={() => toast.info("Функционал пока недоступен")} className={styles.carouselAddItem} key={"3"}  role="presentation">
                                <div className={styles.carouselAddItemIcon} />
                            </div>                            
                        ]
                    }/>
                </div>
            </div>




            {/* РЕКОМЕНДАЦИИ */}
            <div className={styles.reccomendationBlock}>
                <p className={styles.reccomendationBlockTop}>Написать рекомендацию</p>
                <Formik
                    initialValues={{
                        doctorId: doctor?.id,
                        text: "" 
                    }}
                    onSubmit={() => {
                        toast.info("Функционал пока недоступен");
                    }}
                >
                    <Form>
                        <Field as={"textarea"} type="text" name="speciality" className={styles.textarea}/>
                        <div className={styles.reccomendationBlockBottom}>
                            <label className={styles.inputFileLabel}>
                                <input
                                    className={styles.fileInput}
                                    type="file"
                                    name={"image"}
                                />
                                <p className={styles.halo}>Прикрепить файл</p>
                                <div className={styles.fileIcon} />
                            </label>
                            <div className={styles.publicationBtn}>
                                <Btn size={EBtnSize.small} types={EBtnTypes.submit} title="Опубликовать" />
                            </div>
                        </div>
                    </Form>
                </Formik> 
            </div>

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