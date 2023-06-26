import { ChangeEvent, MutableRefObject } from "react";

export default interface IInputFileForMessageProps {
    inputName: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    fileReference: MutableRefObject<null>
    iconClass: string
    tooltipLabel: string
}