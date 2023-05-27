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
import AvatarUploader from "../../components/AvatarUploader/AvatarUploader";
import defaultDoctorImg from "../../assets/img/default-doctor.svg";
import IDoctorUpdateDto from "../../interfaces/IDoctor/IDoctorUpdateDto";
import { useParams } from "react-router-dom";

import EditDoctorBlock from "./EditDoctorBlock/EditDoctorBlock";
import { useEditUserMutation, useGetUserByIdQuery } from "../../app/services/users";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { ERoles } from "../../enums/ERoles";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [editUser, { isError, isSuccess, error: editUserError }] = useEditUserMutation();
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    const successHandler = () => { 
        setShowEditUserModal(false);
        toast.info("Личные данные изменены");
    };

    isError && errorHandler(editUserError);
    isSuccess && successHandler();
    const params = useParams();
    const {data: doctor} = useGetDoctorByUserIdQuery({id: params.id ? String(params.id) : String(user!.id)});

    const [updateData, setUpdateData] = useState(true);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const [editDoctor]= useEditDoctorMutation();

    const modalCancelHandler = () => {
        setShowEditUserModal(false);
        setShowAvatarModal(false);
    };

    const updateDoctorData = async (values: IDoctorUpdateDto) => {
        const formData = new FormData();
        Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        editDoctor({id: doctor?.id || "", doctor:formData});
    };

    const {data: userDoctor} = useGetUserByIdQuery(user!.id);

    return (
        <Container>
            <Modal show={showAvatarModal} close={modalCancelHandler}>
                <AvatarUploader 
                    width={300}
                    height={320}
                    role={ERoles.DOCTOR}
                    modalCloser={modalCancelHandler}
                />
            </Modal>
            {/* <Modal show={showEditUserModal} close={modalCancelHandler}>
                <EditDoctorBlock close={() => setShowEditUserModal(false)} />
            </Modal> */}
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
                            <p className={styles.fieldText}>{userDoctor?.name} {userDoctor?.surname} {userDoctor?.patronim}</p>
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
                                {
                                    doctor?.experience === 1 ? "год" : 
                                        doctor!.experience > 1 && doctor!.experience <=4 ? "года" : "лет"
                                }
                            </p>
                        </div>
                        <div className={styles.personalInformationField}>
                            <p className={styles.fieldTitle}>Моб.телефон</p>
                            <p className={styles.fieldText}>{userDoctor?.phone}</p>
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