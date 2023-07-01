import { FunctionComponent, ReactElement, MouseEvent } from "react";
import IAllParentsTableProps from "./IAllParentsTableProps";
import { useNavigate } from "react-router-dom";
import styles from "../../AllTables.module.css";
import SwitchDiv from "../../../../../components/UI/SwitchDiv/SwitchDiv";

const AllParentsTable: FunctionComponent<IAllParentsTableProps> = (props: IAllParentsTableProps): ReactElement => {
    const navigate = useNavigate();

    const navigateCabinetHandler = (e: MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        navigate(`/parent-cabinet/${id}`);
    };

    return (
        <div className={styles.Table_box}>
            <table className={styles.Table}>
                <thead>
                    <tr className={styles.Table_tr}>
                        <th className={styles.Table_td_right}>ФИО</th>
                        <th className={styles.Table_td_right}>Email</th>
                        <th className={styles.Table_td_right}>Tел.</th>
                        <th className={styles.Table_td_right}>Дата окон. подписки</th>
                        <th className={styles.Table_td}>Активация</th>
                    </tr>
                </thead>
                <tbody>
                    {props.parents.map(({ ...parent }) => {
                        return (
                            <tr className={styles.Table_tr}
                                key={parent.id}
                                onClick={(e) => navigateCabinetHandler(e, parent.userId)}>
                                <td className={styles.Table_td_right}>
                                    {parent.users.surname} {parent.users.name}{" "}
                                    {parent.users.patronim ? parent.users.patronim : ""}
                                </td>
                                <td className={styles.Table_td_right}>
                                    {parent.users.email}
                                </td>
                                <td className={styles.Table_td_right}>
                                    {parent.users.phone}
                                </td>
                                <td className={styles.Table_td_right}>
                                    {new Date(parent.subscriptionEndDate).toLocaleDateString()}
                                </td>
                                <td className={styles.Table_td}>
                                    <div className={styles.switch_td}>
                                        <SwitchDiv isOn={parent.isActive} disabled={true} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllParentsTable;