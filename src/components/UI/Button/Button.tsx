import React from "react";
import styles from "./Button.module.css";
import { EButton } from "../../../enums/EButton";

type Props = {
    name: string,
    onclick: () => void,
    size: EButton,
    disable?: boolean
};

export const Button = ({ name, onclick, size, disable }: Props): React.ReactElement => {
    return (
        <button disabled={disable || false} className={`${styles.btn} ${styles[size]}`} onClick={onclick}>{name}</button>
    );
};
