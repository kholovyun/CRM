import { ERoles } from "../../../enums/ERoles";

export default interface IAvatarUploaderProps {
    width: number
    height: number
    role: ERoles
    id: string
    modalCloser: () => void
}