import IQuestionGetDto from "../../interfaces/IQuestion/IQuestionGetDto";

export default interface IChildQuestionsProps {
    childId: string
    questions: IQuestionGetDto[]
}