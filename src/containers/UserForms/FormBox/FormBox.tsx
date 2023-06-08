import { ReactNode } from "react";
import styles from "./FormBox.module.css";

export const FormBox = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.FormBox}>{children}</div>
    );
};
