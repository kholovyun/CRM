import { FunctionComponent, ReactElement } from "react";
import IVaccinationRowProps from "./IVaccinationRowProps";
import styles from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import { useAppSelector } from "../../../app/hooks";
import { ERoles } from "../../../enums/ERoles";
import IconBtn from "../../UI/IconBtn/IconBtn";

const VaccinationRow: FunctionComponent<IVaccinationRowProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <tr className={styles.Table_tr}>
            <td className={styles.Table_td_right}>{props.vaccination.infection}</td>
            <td className={styles.Table_td_right}>{props.vaccination.vaccine}</td>
            <td className={styles.Table_td_right}>{props.vaccination.age}</td>
            <td className={styles.Table_td_right}>{props.vaccination.date && new Date(props.vaccination.date).toLocaleDateString()}</td>
            <td className={styles.Table_td_right}>{props.vaccination.dose}</td>
            <td className={styles.Table_td_right}>{props.vaccination.serial}</td>
            <td className={styles.Table_td_right}>{props.vaccination.manufacturer}</td>
            <td className={styles.Table_td_right}>{props.vaccination.reaction}</td>
            <td className={styles.Table_td_right}>{props.vaccination.conterindication}</td>
            <td className={styles.Table_td}>{props.vaccination.notes}</td>
            {user?.role === ERoles.DOCTOR ? <td className={styles.Table_td}><IconBtn onclick={props.deleteVaccination} btnClass={"delete_btn"} /></td> : null}
        </tr>
    );
};

export default VaccinationRow;