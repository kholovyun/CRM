import { FunctionComponent, ReactElement } from "react";
import styles from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import { useAppSelector } from "../../../app/hooks";
import { ERoles } from "../../../enums/ERoles";
import IconBtn from "../../UI/IconBtn/IconBtn";
import ISpecExamsRowProps from "./ISpecExamsRowProps";

const SpecExamRow: FunctionComponent<ISpecExamsRowProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <tr className={styles.Table_tr}>
            <td className={styles.Table_td_right}>{props.specExam.specialist}</td>
            <td className={styles.Table_td_right}>{props.specExam.name}</td>
            <td className={styles.Table_td_right}>{props.specExam.date && new Date(props.specExam.date).toLocaleDateString()}</td>
            <td className={styles.Table_td_right}>{props.specExam.conclusion}</td>
            <td className={styles.Table_td}>{props.specExam.recommend}</td>
            {user?.role === ERoles.DOCTOR ? <td className={styles.Table_td}><IconBtn btnClass={"delete_btn"} /></td> : null}
        </tr>
    );
};

export default SpecExamRow;