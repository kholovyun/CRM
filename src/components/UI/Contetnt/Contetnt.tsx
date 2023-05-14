import React from "react";
import styles from "./Contetnt.module.css";

export const Contetnt = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.contentBox}>{children}</div>
    );
};
