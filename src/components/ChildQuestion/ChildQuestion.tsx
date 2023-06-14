import { FunctionComponent, ReactElement } from "react";
import IChildQuestionProps from "./IChildQuestionProps";
import styles from "./ChildQuestion.module.css";

const ChildQuestion: FunctionComponent<IChildQuestionProps> = (props): ReactElement => {

    return (
        <div className={styles.questionBlock}>
            <div className={styles.titleBlock}>
                <p>Ранее заданные вопросы</p>
                <div onClick={props.closeBtn} className={styles.closeBtn}></div>
            </div>
            <div className={styles.questionsBlock}>
                {props.questions && props.questions?.map((q) => {
                    return (
                        <div key={q.id} className={styles.oneQuestionBlock}>
                            <p className={styles.questionBody}>{q.question}</p>
                            <div className={styles.arrowDown}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChildQuestion;