import React from "react";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardParent.module.css";
import Btn from "../UI/Btn/Btn";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";
import IParrentCard from "../../interfaces/IParrent/IParrentCard";

type TUser = {
    userData: IParrentCard
};

export const CardParent: React.FC<TUser> = (props) => {
    const date = new Date(props.userData.registerDate).toLocaleDateString();
    return (
        <InfoTable>
            <CardTitle title={"Личные данные"} />
            <FunctionalBox>
                <p>{props.userData.name} {props.userData.surname} {props.userData.patronim || ""}</p>
                <div className={styles.update} />
            </FunctionalBox>
            <FunctionalBox>
                <p>{props.userData.phone}</p>
                <div className={styles.update} />
            </FunctionalBox>
            <FunctionalBox>
                <p>Дата регистрации</p>
                <p>{date}</p>
            </FunctionalBox>
            <FunctionalBox>
                <p>Дата окончания подписки</p>
                <p>25.05.2023</p>
            </FunctionalBox>
            <Btn title="Продлить подписку" size={EBtnSize.tiny}/>
        </InfoTable>
    );
};
