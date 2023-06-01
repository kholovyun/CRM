import { ERoles } from "../../enums/ERoles";
import { ESex } from "../../enums/ESex";

export default interface IParent {
        id: string,
        userId: string,
        doctorId: string,
        registerDate: Date,
        isActive: boolean,
        users: {
            id: string,
            role: ERoles,
            email: string,
            phone: string,
            name: string,
            surname: string,
            patronim?: string | null,
            isBlocked: boolean
        },
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
            users: {
                id: string,
                role: ERoles,
                email: string
                phone: string,
                name: string,
                surname: string,
                patronim?: string | null,
                isBlocked: boolean
            }
        },
        children: [
            {
                id: string,
                parentId: string,
                photo: string,
                name: string,
                surname: string,
                dateOfBirth: Date,
                sex: ESex,
                height: number,
                weight: number,
                patronim?: string | null,
                isActive: boolean,
            }
        ]
}