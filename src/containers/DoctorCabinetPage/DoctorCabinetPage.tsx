import { ChangeEvent, FunctionComponent, ReactElement, useRef, useState } from "react";
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
import { useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import Modal from "../../components/UI/Modal/Modal";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const {data: doctor} = useGetDoctorByUserIdQuery();
    const [updateData] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const modalCancelHandler = () => {
        setShowModal(false);
        console.log(doctor);
    };
    

    return (
        <Container>
            <Formik
                initialValues={{
                    nameSurnamePatronim: `${user?.surname} ${user?.name} ${user?.patronim || ""} `,
                    speciality: doctor?.speciality,
                    placeOfWork: doctor?.placeOfWork,
                    experience: `Стаж ${doctor?.experience} лет`,
                    achievments: doctor?.achievements
                }}
                validateOnBlur
                onSubmit={() => {
                    toast.info("Функционал пока недоступен");
                }}
            >
                <div className={styles.DoctorCabinetPage}>
                    <div className={styles.doctorInformationBlock}>
                        <Modal show={showModal} close={modalCancelHandler}>
                            <UploadAvatar click={() => setShowModal(false)}/>
                        </Modal>
                        <div className={styles.doctorAvatar}>
                            <div className={styles.backdrop}
                                onClick={() => {setShowModal(true);}}
                            >   
                            </div>
                            <img 
                                className={styles.doctorImage}
                                onError={(e) => { e.currentTarget.src = "/avatar.jpg";}}
                                src={doctor?.photo !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/doctorsImgs/${doctor?.photo}` : "/avatar.jpg"} alt={"doctor"}
                            />
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