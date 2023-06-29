import IDoctorWithUser from "../../../interfaces/IDoctor/IDoctorWithUser";
import IVisitCreateDto from "../../../interfaces/IVisit/IVisitCreateDto";

export default interface IAddVisitFormProps {
    visit: IVisitCreateDto
    modalCloser: () => void
    childId: string
    doctor: IDoctorWithUser
}