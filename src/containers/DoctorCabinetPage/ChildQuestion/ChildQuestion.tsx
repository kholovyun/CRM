import { FunctionComponent, ReactElement } from "react";
import styles from "./ChildQuestion.module.css";
import { useGetChildrenByIdQuery } from "../../../app/services/children";
import defaultImg from "../../../assets/img/default-child-photo.svg";
import IQuestionGetDto from "../../../interfaces/IQuestion/IQuestionGetDto";
import Question from "../../../components/ChildQuestions/Question/Question";

const ChildQuestion: FunctionComponent<{childId: string, question: IQuestionGetDto}> = ({childId, question}): ReactElement => {

    const {data: child} = useGetChildrenByIdQuery(childId);

    return (
        <div className={styles.ChildQuestion}>
            <div className={styles.childImg}>
                {child?.photo !== undefined ? 
                    <img 
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={child?.photo !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/childrenImgs/${child?.photo}` : defaultImg} alt={"avatar"}
                    /> : <img src={defaultImg} alt={"avatar"}/>
                }
            </div>
            <div className={styles.questionChat}>
                {child && <Question
                    childData={{
                        name: child.name,
                        surname: child.surname,
                        photo: child.photo,
                        patronim: child.patronim
                    }}
                    question={question}
                    key={child?.id}
                />}
            </div>
            
        </div>
    );
};

export default ChildQuestion;