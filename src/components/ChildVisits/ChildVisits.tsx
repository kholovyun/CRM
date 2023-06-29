import { FunctionComponent, ReactElement, useState } from "react";
import stylesTable from "../../containers/AdminPage/AdminTables/AllTables.module.css";
import styles from "./ChildVisits.module.css";
import IChildVisitsProps from "./IChildVisitsProps";
import VisitsRow from "./VisitRow/VisitRow";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";
import Modal from "../UI/Modal/Modal";

const ChildVisits: FunctionComponent<IChildVisitsProps> = (props): ReactElement => {
    const [showAddModal, setShowAddModal] = useState(false);

    const addNewVisitCloser = () => {
        setShowAddModal(false);
    };

    return (
        <div>
            <Modal show={showAddModal} close={addNewVisitCloser}>
                <div>djhdfdxfd</div>
            </Modal>
            <div className={styles.child_visits}>
                <table className={stylesTable.Table}>
                    <thead>
                        <tr className={stylesTable.Table_tr}>
                            <th className={styles.visitsTable_td_right}>Дата осмотра</th>
                            <th className={styles.visitsTable_td_right}>Место осмотра</th>
                            <th className={styles.visitsTable_td_right}>Характер посещение</th>
                            <th className={styles.visitsTable_td_right}>Клинические данные</th>
                            <th className={styles.visitsTable_td_right}>Заключение</th>
                            <th className={styles.visitsTable_td}>Назначение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.visits && props.visits.map((visit) => {
                            return <VisitsRow key={visit.id} visit={visit} />;
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.visitAdd_btn}>
                <Btn 
                    onclick={() => setShowAddModal(true)}
                    title="Добавить" 
                    size={EBtnSize.small} 
                    types={EBtnTypes.button}
                    btnClass={EBtnClass.dark_active} />
            </div>
        </div>

    );
};

export default ChildVisits;