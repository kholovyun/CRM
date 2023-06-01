import React from "react";
import styles from "./ChildrenCardBox.module.css";
import { CardChild } from "../../components/CardChild/CardChild";
import { CardAddSome } from "../../components/CardAddSome/CardAddSome";
import { IchildrenProps } from "../../interfaces/IParrent/IChildren/IchildrenProps";

export const ChildrenCardBox: React.FC<IchildrenProps> = (props) => {
    return (
        <div className={styles.childBoxInf}>
            {props.array.length && props.array.map((child) => {
                return <CardChild key={child.id} child={child} />;
            })}
            <CardAddSome title="Добавить ребенка"/>
        </div>
    );
};
