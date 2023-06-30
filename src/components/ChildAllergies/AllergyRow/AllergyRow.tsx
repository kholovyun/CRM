import { FunctionComponent, ReactElement } from "react";
import IAllergyRowProps from "./IAllergyRowProps";
import styles from "../ChildAllergies.module.css";

const AllergyRow: FunctionComponent<IAllergyRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.allergiesTable_tr}>
            <td className={styles.allergiesTable_td_right}>{props.allergy.type}</td>
            <td className={styles.allergiesTable_td_right}>{props.allergy.symptom}</td>
            <td className={styles.allergiesTable_td_right}>{props.allergy.factors}</td>
        </tr>
    );
};

export default AllergyRow;