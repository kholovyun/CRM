import { useEditDoctorMutation } from "../../app/services/doctors";
import { useEditChildMutation } from "../../app/services/children";
import { EImageDirectories } from "../../enums/EImageDirectories";

export default interface IAvatarBoxProps {
    avatar: string
    id: string
    width: number
    height: number
    directoryName: EImageDirectories
    defaultImg: string
    useMutation: 
        typeof useEditDoctorMutation | 
        typeof useEditChildMutation
}