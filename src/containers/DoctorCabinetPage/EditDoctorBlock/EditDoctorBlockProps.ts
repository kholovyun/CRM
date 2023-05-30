import IDoctorWithUser from "../../../interfaces/IDoctor/IDoctorWithUser";

export default interface IEditDoctorBlockProps {
    modalCloser: () => void
    doctorData: IDoctorWithUser
}