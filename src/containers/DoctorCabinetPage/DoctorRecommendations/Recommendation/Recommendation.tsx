import { FunctionComponent, ReactElement, useState } from "react";
import styles from "./Recommendation.module.css";
import IRecommendationProps from "./IRecommendationProps";
import { toast } from "react-toastify";
import Modal from "../../../../components/UI/Modal/Modal";

const Recommendation: FunctionComponent<IRecommendationProps> = ({ recommendation, deleteRecommendation }): ReactElement => {
    const datetime = new Date(recommendation.createdAt)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.recommendation}>
            <Modal show={showModal} close={closeModal}>
                <div className={styles.avatarButtons}>
                    <button 
                        onClick={deleteRecommendation} className={styles.avatarBtn}>Удалить</button> 
                    <button 
                        onClick={closeModal} className={styles.avatarBtn}>Отмена</button> 
                </div> 
            </Modal>
            <div className={styles.recommendationTop}>
                <p className={styles.recommendationDatetime}><b>{datetime}</b></p>
                <div className={styles.buttons}>
                    <div className={styles.editBtn} onClick={() => toast.info("Функция еще не доступна")}></div>
                    <div className={styles.deleteBtn} onClick={openModal}></div>
                </div>
            </div>
            <div>
                <p className={styles.text}>{recommendation.text}</p>
            </div>
        </div>
    );
};

export default Recommendation;