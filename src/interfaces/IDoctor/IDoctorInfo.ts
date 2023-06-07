import { ERoles } from "../../enums/ERoles";

export interface IDoctorInfo {
    doc: {
        achievements: string
        degree: string
        experience: number 
        id: string
        isActive: boolean
        photo: string
        placeOfWork: string
        price: string
        speciality: string
        userId: string
        users: {
            email: string
            id: string
            isBlocked: boolean
            name: string
            patronim?: string | null
            phone: string
            role: ERoles
            surname : string
        }
    }
};