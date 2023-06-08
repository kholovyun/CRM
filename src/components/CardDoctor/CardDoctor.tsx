import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardDoctor.module.css";
import Btn from "../UI/Btn/Btn";
import defaultImage from "../../assets/img/default-doctor.svg";
import { FC } from "react";
import { IDoctorInfo } from "../../interfaces/IDoctor/IDoctorInfo";
import { useNavigate } from "react-router-dom";



export const CardDoctor: FC<IDoctorInfo> = (props) => {
    const navigate = useNavigate();
    return (
        <InfoTable>
            <CardTitle title="Данные о враче"/>
            <FunctionalBox>
                <img
                    className={styles.docAvatar}
                    onError={(e) => { e.currentTarget.src = defaultImage;}}
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/doctorsImgs/${props.doc.photo}`}
                    alt="doctor" />
                <div className={styles.InfoBlock}>
                    <p>{props.doc.users.name}</p>
                    <p>{props.doc.users.surname}</p>
                    <p>{props.doc.users.patronim}</p>
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
            <Btn title={`${props.doc.users.name + " " + props.doc.users.surname}`}
                size={EBtnSize.tiny}
                onclick={() => navigate(`/doctor-cabinet/${props.doc.users.id}`)}
            />
        </InfoTable>
    );
};
