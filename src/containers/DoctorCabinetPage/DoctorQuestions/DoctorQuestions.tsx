import { FunctionComponent, ReactElement } from "react";
import styles from "./DoctorQuestions.module.css";

const DoctorQuestions: FunctionComponent = (): ReactElement => {
    return (
        <div className={styles.questionsBlock}>
            <div className={styles.questionsBlockLeft}>
                <p className={styles.questionsBlockLeftTop}>Новые вопросы</p>
            </div>
            <div className={styles.questionsBlockRight}>
            </div>
        </div>
    )
}

export default DoctorQuestions;