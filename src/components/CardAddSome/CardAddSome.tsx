import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { InfoTableChild } from "../UI/InfoTableChild/InfoTableChild";
import React from "react";
import styles from "./CardAddSome.module.css";

interface ICardAddSome {
    title: string,
}

export const CardAddSome: React.FC<ICardAddSome> = (props) => {
    return (
        <InfoTableChild>
            <FunctionalBox>
                <p style={{width: "100%", textAlign: "center"}}>{props.title}</p>
            </FunctionalBox>
            <FunctionalBox>
                <p className={styles.addChildPlas}>+</p>
            </FunctionalBox>
        </InfoTableChild>
    );
};
