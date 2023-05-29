import React from "react";
import styles from "./InfoTableChild.module.css";

export const InfoTableChild = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.infoTableChild}>
            {children}
        </div>
    );
};