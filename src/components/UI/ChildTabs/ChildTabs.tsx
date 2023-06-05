import React from "react";
import styles from "./ChildTabs.module.css";
import { IchildrenProps } from "../../../interfaces/IParent/IChildren/IchildrenProps";

export const ChildTabs: React.FC<IchildrenProps> = (props) => {
    return (
        <div className={styles.tabsBox}>
            {props.array &&
                props.array.map((el) => {
                    return (
                        <a key={el.id} className={styles.tabChildren}>
                            {el.name}
                        </a>
                    );
                })}
        </div>
    );
};
