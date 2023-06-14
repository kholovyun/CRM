import {FunctionComponent, ReactElement} from "react";
import styles from "./Recommendation.module.css";
import IRecommendationProps from "./IRecommendationProps";
import { toast } from "react-toastify";

const Recommendation: FunctionComponent<IRecommendationProps> = ({recommendation, deleteRecommendation}): ReactElement => {
    const datetime = new Date(recommendation.createdAt)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    
    return (
        <div className={styles.recommendation}>
            <div className={styles.recommendationTop}>
                <p className={styles.recommendationDatetime}><b>{datetime}</b></p>
                <div className={styles.buttons}>
                    <div className={styles.editBtn} onClick={() => toast.info("Функция еще не доступна")}></div> 
                    <div className={styles.deleteBtn} onClick={deleteRecommendation}></div> 
                </div> 
            </div>
            <div>
                <p className={styles.text}>{recommendation.text}</p>
            </div>
        </div>
    );
};

export default Recommendation;