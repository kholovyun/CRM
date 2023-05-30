import React from "react";
import styles from "./ChildrenCardBox.module.css";
import { CardChild } from "../../components/CardChild/CardChild";
import { CardAddSome } from "../../components/CardAddSome/CardAddSome";

interface IChildren {
    id: string,
    name: string,
    surname: string,
    patronim: string,
    dateOfBirth: string,
}

interface IchildrenProps {
    array: IChildren[],
}

export const ChildrenCardBox: React.FC<IchildrenProps> = (props) => {
    return (
        <div className={styles.childBoxInf}>
            {props.array.length && props.array.map((child) => {
                return <CardChild key={child.id} name={child.name} surname={child.surname} patronim={child.patronim} dateOfBirth={child.dateOfBirth} />;
            })}
            <CardAddSome title="Добавить ребенка"/>
        </div>
    );
};
