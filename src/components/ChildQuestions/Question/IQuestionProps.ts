import IQuestionGetDto from "../../../interfaces/IQuestion/IQuestionGetDto";

export default interface IQuestionProps {
    question: IQuestionGetDto
    childData: {
        name: string
        surname: string
        patronim?: string
        photo: string
    }
}