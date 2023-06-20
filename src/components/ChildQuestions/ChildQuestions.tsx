import { FunctionComponent, ReactElement, useState, useEffect } from "react";
import styles from "./ChildQuestions.module.css";
import IChildQuestionsProps from "./IChildQuestionsProps";
import { useGetQuestionsByChildIdQuery } from "../../app/services/questions";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";


const ChildQuestions: FunctionComponent<IChildQuestionsProps> = (props): ReactElement => {
    const {
        data: questions,
        isError: isErrorGetQuestions,
        error: errorGetQuestions
    } = useGetQuestionsByChildIdQuery(props.childId);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorGetQuestions && errorHandler(errorGetQuestions);
    }, [isErrorGetQuestions]);

    const [showFullQuestion, setShowFullQuestion] = useState(false);

    const handleShowFullQuestion = () => {
        setShowFullQuestion(!showFullQuestion);
    };

    return (
        <div className={styles.questionsList}>
            <div className={styles.titleBlock}>
                <p>Ранее заданные вопросы</p>
                <div className={styles.closeBtn}></div>
            </div>
            <div className={styles.questionsBlock}>
                {questions && questions?.map(q => {
                    return (
                        <div key={q.id}>
                            <div className={styles.oneQuestionBlock}>
                                <p className={styles.questionBody}>{q.question}</p>
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
                })}
            </div>
        </div>
    );
};

export default ChildQuestions;