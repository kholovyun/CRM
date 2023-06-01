import React from "react";
import styles from "./ChildTabs.module.css";

export const ChildTabs: React.FC<IchildrenProps> = (props) => {
    return (
        <div className={styles.tabsBox}>
            {props.array.length && props.array.map((el) => {
                return <a key={el.id} className={styles.tabChildren}>{el.name}</a>;
            })}
        </div>
    );
};
