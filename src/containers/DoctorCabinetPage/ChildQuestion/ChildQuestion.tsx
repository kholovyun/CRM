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
                {child?.result.photo !== undefined ? 
                    <img 
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={child?.result.photo !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/childrenImgs/${child?.result.photo}` : defaultImg} alt={"avatar"}
                    /> : <img src={defaultImg} alt={"avatar"}/>
                }
            </div>
            <div className={styles.questionChat}>
                {child && <Question
                    childData={{
                        name: child.result.name,
                        surname: child.result.surname,
                        photo: child.result.photo,
                        patronim: child.result.patronim
                    }}
                    question={question}
                    key={child?.result.id}
                />}
            </div>
            
        </div>
    );
};

export default ChildQuestion;