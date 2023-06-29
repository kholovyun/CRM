import { FunctionComponent, ReactElement } from "react";
import styles from "../ChildVisits.module.css";
import IVisitRowProps from "./IVisitRowProps";

const VisitsRow: FunctionComponent<IVisitRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.visitsTable_tr}>
            <td className={styles.visitsTable_td_right}>{new Date(props.visit.date).toLocaleDateString()}</td>
            <td className={styles.visitsTable_td_right}>{}</td>
            <td className={styles.visitsTable_td_right}>{props.visit.reason}</td>
            <td className={styles.visitsTable_td_right}>{props.visit.clinicData}</td>
            <td className={styles.visitsTable_td_right}>{props.visit.conclusion}</td>
            <td className={styles.visitsTable_td}>{props.visit.appointment}</td>
        </tr>
    );
};

export default VisitsRow;