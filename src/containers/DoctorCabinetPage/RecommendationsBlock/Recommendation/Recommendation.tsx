import {FunctionComponent, ReactElement} from "react";
import styles from "./Recommendation.module.css";
import IRecommendationProps from "./IRecommendationProps";

const Recommendation: FunctionComponent<IRecommendationProps> = ({recommendation}): ReactElement => {
    const datetime = new Date(recommendation.createdAt)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    
    return (
        <div className={styles.recommendation}>
            <p className={styles.recommendationDatetime}><b>{datetime}</b></p>
            {recommendation.text}
        </div>
    );
};

export default Recommendation;