import { ReactNode } from "react";
import styles from "./InfoTable.module.css";

export const InfoTable = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.infoTable}>
            {children}
        </div>
    );
};