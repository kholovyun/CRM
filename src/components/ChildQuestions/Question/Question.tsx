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
            <div className={styles.question}  onClick={handleShowFullQuestion}>
                <p className={styles.questionBody}>{props.question.question}</p>
                <div className={`${showFullQuestion ? styles.arrowUp : styles.arrowDown}`}></div>
            </div>
            {showFullQuestion ?
                <div className={styles.fullQuestionBlock}>
                    <p>ответ пока нет</p>
                </div>
                : null}
        </div>
    );
};

export default Question;