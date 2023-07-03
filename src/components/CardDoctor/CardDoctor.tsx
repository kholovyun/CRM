import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardDoctor.module.css";
import Btn from "../UI/Btn/Btn";
import defaultImage from "../../assets/img/default-doctor.svg";
import { FunctionComponent, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ICardDoctorProps from "./ICardDoctorProps";

export const CardDoctor: FunctionComponent<ICardDoctorProps> = (props: ICardDoctorProps): ReactElement => {
    const navigate = useNavigate();
    return (
        <InfoTable>
            <CardTitle title="Данные о враче" />
            <FunctionalBox>
                <img
                    className={styles.docAvatar}
                    onError={(e) => { e.currentTarget.src = defaultImage; }}
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/doctorsImgs/${props.doctor.photo}`}
                    alt="doctor" />
                <div className={styles.InfoBlock}>
                    <p>{props.doctor.users.name}</p>
                    <p>{props.doctor.users.surname}</p>
                    <p>{props.doctor.users.patronim}</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p>Степень:</p>
                <p>{props.doctor.degree}</p>
            </FunctionalBox>
            <FunctionalBox>
                <p>Стаж работы</p>
                <p>{props.doctor.experience} лет</p>
            </FunctionalBox>
            <Btn title={`${props.doctor.users.name + " " + props.doctor.users.surname}`}
                size={EBtnSize.tiny}
                onclick={() => navigate(`/doctor-cabinet/${props.doctor.userId}`)}
            />
        </InfoTable>
    );
};
