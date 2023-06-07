import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { InfoTableChild } from "../UI/InfoTableChild/InfoTableChild";
import { FC } from "react";
import styles from "./CardAddSome.module.css";

interface ICardAddSome {
    title: string,
}

export const CardAddSome: FC<ICardAddSome> = (props) => {
    return (
        <InfoTableChild>
            <FunctionalBox>
                <p className={styles.addChildTxt}>{props.title}</p>
            </FunctionalBox>
            <FunctionalBox>
                <p className={styles.addChildPlas}>+</p>
            </FunctionalBox>
        </InfoTableChild>
    );
};
