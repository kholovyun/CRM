import { ERoles } from "../../enums/ERoles";

export default interface IAvatarUploaderProps {
    width: number
    height: number
    role: ERoles
    modalCloser: () => void
}