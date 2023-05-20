import React from "react";
import styles from "./FormBox.module.css";

export const FormBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.FormBox}>{children}</div>
    );
};
