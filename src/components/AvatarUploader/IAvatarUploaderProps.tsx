import IDoctorWithUser from "../../interfaces/IDoctor/IDoctorWithUser";

export default interface IAvatarUploaderProps {
    doctor: IDoctorWithUser
    width: number
    height: number
    modalCloser: () => void
}