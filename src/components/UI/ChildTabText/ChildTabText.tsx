import { ReactNode } from "react";
import styles from "./ChildTabText.module.css";

export const ChildTabText = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.childTabText}>
            {children}
        </div>
    );
};
