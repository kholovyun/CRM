import styles from "./ChildTabText.module.css";
import React from "react";

export const ChildTabText = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.childTabText}>
            {children}
        </div>
    );
};
