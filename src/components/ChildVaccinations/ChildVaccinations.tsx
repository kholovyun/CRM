import {FunctionComponent, ReactElement} from "react";
import IChildVaccinationsProps from "./IChildVaccinationsProps";
import styles from "./ChildVaccinations.module.css";
import stylesTable from "../../containers/AdminPage/AdminTables/AllTables.module.css";
import VaccinationRow from "./VaccinationRow/VaccinationRow";

const ChildVaccinations: FunctionComponent<IChildVaccinationsProps> = (props): ReactElement => {
    return (
        <div className={styles.child_vaccinations}>
            <table className={stylesTable.Table}>
                <thead>
                    <tr className={stylesTable.Table_tr}>
                        <th className={stylesTable.Table_td_right}>Инфекция, против которой ставится прививка</th>
                        <th className={stylesTable.Table_td_right}>Вид вакцины</th>
                        <th className={stylesTable.Table_td_right}>Возраст ребенка</th>
                        <th className={stylesTable.Table_td_right}>Дата</th>
                        <th className={stylesTable.Table_td_right}>Доза</th>
                        <th className={stylesTable.Table_td_right}>Серия</th>
                        <th className={stylesTable.Table_td_right}>Производитель</th>
                        <th className={stylesTable.Table_td_right}>Реакция</th>
                        <th className={stylesTable.Table_td_right}>Медотвод</th>
                        <th className={stylesTable.Table_td}>Примечание</th>
                    </tr>
                </thead>
                <tbody>
                    {props.vaccinations && props.vaccinations.map((vac) => {
                        return <VaccinationRow
                            key={vac.id}
                            vaccination={vac} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ChildVaccinations;