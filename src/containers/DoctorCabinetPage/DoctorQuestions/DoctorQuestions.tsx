import { FC, ReactElement, useState, useEffect } from "react";
import styles from "./DoctorQuestions.module.css";
import { useGetQuestionsByDoctorIdQuery } from "../../../app/services/questions";
import { useGetChildrenForDoctorQuery } from "../../../app/services/children";
import IChildGetDto from "../../../interfaces/IChild/IChildGetDto";
import Question from "../../../components/ChildQuestions/Question/Question";

interface IDoctorQuestionsProps {
    id: string
}

const DoctorQuestions: FC<IDoctorQuestionsProps> = ({id}): ReactElement => {
    const [questionsList, setQuestionsList] = useState(false);
    const showQuestionList = (): void => {
        setQuestionsList(!questionsList);
    };
    const {data: questions} = useGetQuestionsByDoctorIdQuery(id);
    const {data: childrenData, isSuccess} = useGetChildrenForDoctorQuery(id);

    const [children, setChildren] = useState<{ [key: string]: IChildGetDto } >({});

    const transformData = () => {
        const transformedData: { [key: string]: IChildGetDto } = childrenData!.reduce((acc, obj) => {
            acc[obj.id] = obj;
            return acc;
        }, {} as { [key: string]: IChildGetDto });
        setChildren(transformedData);
    };

    useEffect(() => {
        isSuccess && transformData();
    }, [isSuccess]);

    return (
        <div className={styles.questionsBlock}>
            <div className={styles.button} onClick={showQuestionList}>
                <p>Вопросы</p>
                <div className={`${styles.arrow} ${questionsList && styles.arrowUp}`}/>
            </div>
            {questionsList && <div className={styles.questionsList}>
                {questions && questions.map((q) => {
                    // return <QuestionCard 
                    //     key={q.id}
                    //     question={q}
                    // />;
                    return <Question 
                        childData={children[(q.childId)]}
                        question={q}
                        key={q.id}
                    />;
                })}
            </div>}
        </div>
    );
};

export default DoctorQuestions;