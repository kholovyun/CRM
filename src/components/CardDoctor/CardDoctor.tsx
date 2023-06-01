import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardDoctor.module.css";
import Btn from "../UI/Btn/Btn";
import { ERoles } from "../../enums/ERoles";

interface IDoctorInfo {
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

export const CardDoctor = (props: IDoctorInfo) => {
    return (
        <InfoTable>
            <CardTitle title="Данные о враче"/>
            <FunctionalBox>
                <div className={styles.docAvatar}>Img</div>
                <div className={styles.InfoBlock}>
                    <p className={styles.torText}>{props.doc.users.name}</p>
                    <p className={styles.torText}>{props.doc.users.surname}</p>
                    <p className={styles.torText}>{props.doc.users.patronim}</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p>Степень:</p>
                <p>{props.doc.degree}</p>
            </FunctionalBox>
            <FunctionalBox>
                <p>Стаж работы</p>
                <p>{props.doc.experience} лет</p>
            </FunctionalBox>
            <Btn title="Иванов Иван" size={EBtnSize.tiny}/>
        </InfoTable>
    );
};
