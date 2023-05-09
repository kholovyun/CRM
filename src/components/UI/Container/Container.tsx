import styles from "./Container.module.css";
import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
