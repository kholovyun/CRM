import { FC } from "react";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { InfoTable } from "../UI/InfoTable/InfoTable";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardParent.module.css";
import Btn from "../UI/Btn/Btn";
import { CardTitle } from "../UI/ParrentUi/CardTitle/CardTitle";
import IParent from "../../interfaces/IParent/IParrent";

type TParentCard = {
    userData: IParent
};

export const CardParent: FC<TParentCard> = (props) => {
    const date = new Date(props.userData.registerDate).toLocaleDateString();
    const endDate = new Date(props.userData.users.subscriptions[0].endDate).toLocaleDateString();
    return (
        <InfoTable>
            <CardTitle title={"Личные данные"} />
            <FunctionalBox>
                <p>{props.userData.users.name} {props.userData.users.surname} {props.userData.users.patronim || ""}</p>
                <div className={styles.update} />
            </FunctionalBox>
            <FunctionalBox>
                <p>{props.userData.users.phone}</p>
                <div className={styles.update} />
            </FunctionalBox>
            <FunctionalBox>
                <p>Дата регистрации</p>
                <p>{date}</p>
            </FunctionalBox>
            <FunctionalBox>
                <p>Дата окончания подписки</p>
                <p>{endDate}</p>
            </FunctionalBox>
            <Btn title="Продлить подписку" size={EBtnSize.tiny}/>
        </InfoTable>
    );
};
