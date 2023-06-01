import { ERoles } from "../../enums/ERoles";

export default interface iUserWithSubscribe {
    id: string
    role: ERoles
    email: string
    phone: string
    name: string
    surname: string
    patronim: string
    isBlocked: boolean
    subscriptions: [
        {
            id: string,
            userId: string,
            payedBy: string,
            type: number,
            paymentType: string,
            sum: string,
            endDate: string,
            payed_by: string
        }
    ]
}