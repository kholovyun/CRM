import { FC, ReactElement, useEffect, useState } from "react";
import styles from "./QuestionCard.module.css";
import IQuestionGetDto from "../../../../interfaces/IQuestion/IQuestionGetDto";
import Question from "../../../../components/ChildQuestions/Question/Question";

interface IQuestionCardProps {
    question: IQuestionGetDto
}

const QuestionCard:FC<IQuestionCardProps> = ({question}):ReactElement => {
    const [questionCard, setQuestionCard] = useState(false);

    const showQuestionCard = () => {
        
        setQuestionCard(!questionCard);
    };

    

    return (
        <div className={styles.questionCard}>
            <div className={styles.showButton} onClick={showQuestionCard}>
                <p>{question.question}</p>
                <div className={`${styles.arrow} ${questionCard && styles.arrowUp}`}/>
            </div>
            
        </div>
    );
};

export default QuestionCard;