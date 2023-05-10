import React from "react";
import styles from "./Button.module.css";
import { EButton } from "../../../enums/EButton";
import { EButtonTypes } from "../../../enums/EButtonTypes";

type Props = {
    name: string,
    onclick: () => void,
    size?: EButton,
    disable?: boolean,
    types?: EButtonTypes
};

export const Button = ({ name, onclick, size, disable, types }: Props): React.ReactElement => {
    return (
        <button type={types || "button"} disabled={disable || false} className={`${styles.btn} ${styles[size || ""]}`} onClick={onclick}>{name}</button>
    );
};
