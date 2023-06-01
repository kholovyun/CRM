import IUserGetDto from "../IUser/IUserGetDto";
import iUserWithSubscribe from "../IUser/iUserWithSubscribe";
import { IChildrenData } from "./IChildren/IChildrenData";

export default interface IParent {
        id: string,
        userId: string,
        doctorId: string,
        registerDate: Date,
        isActive: boolean,
        users: iUserWithSubscribe,
        doctors: {
            id: string,
            userId: string,
            photo: string,
            speciality: string,
            placeOfWork: string,
            experience: number,
            isActive: boolean,
            price: string,
            achievements: string,
            degree: string,
            users: IUserGetDto
        },
        children: IChildrenData[]
}