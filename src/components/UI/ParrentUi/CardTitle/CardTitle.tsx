import { FunctionComponent, ReactElement } from "react";
import styles from "./CardTitle.module.css";

type Cardtitle = {
    title: string,
};

export const CardTitle: FunctionComponent<Cardtitle> = (props): ReactElement => {
    return (
        <h2 className={styles.cardParentTitle}>{props.title}</h2>
    );
};
