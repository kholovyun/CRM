import styles from "./FunctionalBox.module.css";
import React from "react";

export const FunctionalBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.functionalBox}>
            {children}
        </div>
    );
};