import { ESex } from "../../../enums/ESex";

export interface IChildrenData {
    id: string,
    parentId: string,
    photo: string,
    name: string,
    surname: string,
    dateOfBirth: string,
    sex: ESex,
    height: number,
    weight: number,
    patronim?: string | null,
    isActive: boolean,
}