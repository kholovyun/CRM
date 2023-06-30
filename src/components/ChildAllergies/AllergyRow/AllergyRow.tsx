import { FunctionComponent, ReactElement } from "react";
import IAllergyRowProps from "./IAllergyRowProps";
import styles from "../../../containers/AdminPage/AdminTables/AllTables.module.css";

const AllergyRow: FunctionComponent<IAllergyRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.Table_tr}>
            <td className={styles.Table_td_right}>{props.allergy.type}</td>
            <td className={styles.Table_td_right}>{props.allergy.symptom}</td>
            <td className={styles.Table_td}>{props.allergy.factors}</td>
        </tr>
    );
};

export default AllergyRow;