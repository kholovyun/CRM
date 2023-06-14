import IQuestionGetDto from "../../interfaces/IQuestion/IQuestionGetDto";

export default interface IChildQuestionProps {
    questions: IQuestionGetDto[]
    closeBtn: React.MouseEventHandler<HTMLElement>
}