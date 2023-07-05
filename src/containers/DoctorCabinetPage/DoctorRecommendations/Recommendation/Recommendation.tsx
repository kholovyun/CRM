import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "./Recommendation.module.css";
import IRecommendationProps from "./IRecommendationProps";
import { toast } from "react-toastify";
import Modal from "../../../../components/UI/Modal/Modal";
import AccessControl from "../../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../../enums/ERoles";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../enums/EBtnClass";
import Btn from "../../../../components/UI/Btn/Btn";
import defaultImg from "../../../../assets/img/default-any-image.svg";

const Recommendation: FunctionComponent<IRecommendationProps> = ({ recommendation, deleteRecommendation }): ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const [showFullImageModal, setShowFullImageModal] = useState(false);

    const openFullImageModal = () => {
        setShowFullImageModal(true);
    };
    const closeFullImageModal = () => {
        setShowFullImageModal(false);
        
    };

    return (
        <div className={styles.recommendation}>
            <Modal show={showFullImageModal} close={closeFullImageModal}>
                <div className={styles.fullImage}>
                    <img
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={recommendation.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/docRecommends/${recommendation.url}` : defaultImg} alt={"recommendationImg"} />
                </div>
            </Modal>
            <Modal
                show={showModal}
                close={closeModal}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>удалить</span> эту рекомендацию?
                        </p>
                    </div>
                    <div className={styles.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={closeModal}
                        />
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Да"}
                            btnClass={EBtnClass.dark_active}
                            onclick={deleteRecommendation}
                        />
                    </div>
                </div>
            </Modal>
            <div className={styles.recommendationTop}>
                <b className={styles.recommendationDatetime}>{new Date(recommendation.createdAt).toLocaleDateString()}{" "}</b>
                <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                    <div className={styles.buttons}>
                        <div className={styles.editBtn} onClick={() => toast.info("Функция еще не доступна")}></div>
                        <div className={styles.deleteBtn} onClick={openModal}></div>
                    </div>
                </AccessControl>
            </div>
            <div className={styles.recommendationBottom}>
                {recommendation.url !== "" ? <div onClick={openFullImageModal} className={styles.recommendationImg}>
                    <img 
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={recommendation.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/docRecommends/${recommendation.url}` : defaultImg} alt={"recommendationImg"}
                    />
                </div> : null}
                <p className={styles.text}>{recommendation.text}</p>
            </div>
        </div>
    );
};

export default Recommendation;