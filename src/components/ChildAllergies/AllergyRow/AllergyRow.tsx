import { FunctionComponent, ReactElement } from "react";
import IAllergyRowProps from "./IAllergyRowProps";
import styles from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import IconBtn from "../../UI/IconBtn/IconBtn";

const AllergyRow: FunctionComponent<IAllergyRowProps> = (props): ReactElement => {
    return (
        <tr className={styles.Table_tr}>
            <td className={styles.Table_td_right}>{props.allergy.type}</td>
            <td className={styles.Table_td_right}>{props.allergy.symptom}</td>
            <td className={styles.Table_td_right}>{props.allergy.factors}</td>
            <td className={styles.Table_td}><IconBtn onclick={props.deleteAllergy} btnClass={"delete_btn"} /></td>
        </tr>
    );
};

export default AllergyRow;