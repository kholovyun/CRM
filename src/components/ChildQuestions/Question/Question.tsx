import { FunctionComponent, ReactElement, useState } from "react";
import styles from "./Question.module.css";
import IQuestion from "./IQuestion";

const Question: FunctionComponent<IQuestion> = (props): ReactElement => {
    const [showFullQuestion, setShowFullQuestion] = useState(false);

    const handleShowFullQuestion = () => {
        setShowFullQuestion(!showFullQuestion);
    };
    return (
        <div>
            <div className={styles.question}>
                <p className={styles.questionBody}>{props.question.question}</p>
                <button
                    onClick={handleShowFullQuestion}
                    className={styles.questionBtn}>
                    <div className={`${showFullQuestion ? styles.arrowUp : styles.arrowDown}`}></div>
                </button>
            </div>
            {showFullQuestion ?
                <div className={styles.fullQuestionBlock}>
                    kjfhjhkfjf
                </div>
                : null}
        </div>
    );
};

export default Question;