import React from "react";
import styles from "./InfoTable.module.css";

export const InfoTable = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.infoTable}>
            {children}
        </div>
    );
};