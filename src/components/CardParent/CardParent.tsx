import React from "react";
import IUserCreateDto from "../../interfaces/IUser/IUserCreateDto";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardParent.module.css";
import Btn from "../UI/Btn/Btn";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";

type TUser = {
    userData: IUserCreateDto
};

export const CardParent: React.FC<TUser> = (props) => {
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
                <p>25.05.2023</p>
            </FunctionalBox>
            <FunctionalBox>
                <p>Дата окончания подписки</p>
                <p>25.05.2023</p>
            </FunctionalBox>
            <Btn title="Продлить подписку" size={EBtnSize.tiny}/>
        </InfoTable>
    );
};
