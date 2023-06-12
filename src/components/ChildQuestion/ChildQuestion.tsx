import { FunctionComponent, ReactElement } from "react";
import IChildQuestionProps from "./IChildQuestionProps";
import { Container } from "../UI/Container/Container";
import styles from "./ChildQuestion.module.css";
import { useGetQuestionsByChildIdQuery } from "../../app/services/questions";


const ChildQuestion: FunctionComponent<IChildQuestionProps> = (props): ReactElement => {
    const {data: questions} = useGetQuestionsByChildIdQuery(props.childId);
    return (
        <Container>
            <div className={styles.questionBlock}>
                <div className={styles.titleBlock}>
                    <p>Ранее заданные вопросы</p>
                    <div className={styles.closeBtn}></div>
                </div>
                <div className={styles.questionsBlock}>
                    {questions?.map(q => {
                        return <p key={q.id}>{q.question}</p>;
                    })}
                </div>
            </div>
        </Container>
    );
};

export default ChildQuestion;