import styles from "./SubInfoTable.module.css";
import {ReactNode} from "react";

export const SubInfoTable = ({children}: { children: ReactNode }) => {
    return (
        <div className={styles.subInfoTable}>
            {children}
        </div>
    );
};
