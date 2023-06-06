import {FunctionComponent, ReactElement} from "react";
import styles from "./Recommendation.module.css";
import IRecommendationProps from "./IRecommendationProps";

const Recommendation: FunctionComponent<IRecommendationProps> = ({recommendation, deleteRecommendation}): ReactElement => {
    const datetime = new Date(recommendation.createdAt)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    
    return (
        <div className={styles.recommendation}>
            <div className={styles.recommendationTop}>
                <p className={styles.recommendationDatetime}><b>{datetime}</b></p>
                {
                    <button className={styles.btn} onClick={deleteRecommendation}>Удалить</button>     
                }  
            </div>
            <div>
                {recommendation.text}
            </div>
        </div>
    );
};

export default Recommendation;