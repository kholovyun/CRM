import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardDoctor.module.css";
import Btn from "../UI/Btn/Btn";
import React from "react";

export const CardDoctor: React.FC = () => {
    return (
        <InfoTable>
            <CardTitle title="Данные о враче"/>
            <FunctionalBox>
                <div className={styles.docAvatar}>Img</div>
                <div className={styles.docInfoBlock}>
                    <p className={styles.doctorText}>Иван</p>
                    <p className={styles.doctorText}>Иванов</p>
                    <p className={styles.doctorText}>Айболитович</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p>Степень:</p>
                <p>Профессор</p>
            </FunctionalBox>
            <FunctionalBox>
                <p>Стаж работы</p>
                <p>25 лет</p>
            </FunctionalBox>
            <Btn title="Иванов Иван" size={EBtnSize.tiny}/>
        </InfoTable>
    );
};
