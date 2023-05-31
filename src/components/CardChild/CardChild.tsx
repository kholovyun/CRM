import { InfoTableChild } from "../UI/InfoTableChild/InfoTableChild";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardChild.module.css";
import Btn from "../UI/Btn/Btn";
import React from "react";

interface ICardAddSome {
    avatar?: string,
    name: string,
    surname: string,
    patronim?: string,
    dateOfBirth: string,
}

export const CardChild: React.FC<ICardAddSome> = (props) => {
    return (
        <InfoTableChild>
            <FunctionalBox>
                <div className={styles.docAvatar} style={{ background: props.avatar ? `url(${props.avatar})` : "white"}}>Img</div>
                <div className={styles.docInfoBlock}>
                    <p className={styles.doctorText}>{props.name}</p>
                    <p className={styles.doctorText}>{props.surname}</p>
                    <p className={styles.doctorText}>{props.patronim || ""}</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p className={styles.dateChildStyle}>{props.dateOfBirth}</p>
            </FunctionalBox>
            <Btn title="Подробнее" size={EBtnSize.tiny}/>
        </InfoTableChild>
    );
};
