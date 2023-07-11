import { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import IAllergyRowProps from "./IAllergyRowProps";
import styles from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import IconBtn from "../../UI/IconBtn/IconBtn";
import { useAppSelector } from "../../../app/hooks";
import { ERoles } from "../../../enums/ERoles";

const AllergyRow: FunctionComponent<IAllergyRowProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <tr className={styles.Table_tr}>
            <td className={styles.Table_td_right}>{props.allergy.type}</td>
            <td className={styles.Table_td_right}>{props.allergy.symptom}</td>
            <td className={user?.role === ERoles.DOCTOR ? styles.Table_td_right: styles.Table_td}>{props.allergy.factors}</td>
            {user?.role === ERoles.DOCTOR ? <td className={styles.Table_td}><IconBtn onclick={props.showModalDeleteAllergy as MouseEventHandler<HTMLButtonElement>} btnClass={"delete_btn"} /></td> : null}
        </tr>
    );
};

export default AllergyRow;