import React from "react";
import styles from "./CardTitle.module.css";

type Cardtitle = {
    title: string,
}

export const CardTitle: React.FC<Cardtitle> = (props) => {
    return (
        <h2 className={styles.cardParentTitle}>{props.title}</h2>
    )
}
