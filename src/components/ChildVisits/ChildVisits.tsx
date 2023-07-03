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
import { ERoles } from "../../enums/ERoles";
import { useAppSelector } from "../../app/hooks";

const ChildVisits: FunctionComponent<IChildVisitsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
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
                            <th className={stylesTable.Table_td_right}>Дата осмотра</th>
                            <th className={stylesTable.Table_td_right}>Место осмотра</th>
                            <th className={stylesTable.Table_td_right}>Характер посещение</th>
                            <th className={stylesTable.Table_td_right}>Клинические данные</th>
                            <th className={stylesTable.Table_td_right}>Заключение</th>
                            <th className={user?.role === ERoles.DOCTOR ? stylesTable.Table_td_right: stylesTable.Table_td}>Назначение</th>
                            {user?.role === ERoles.DOCTOR ? <th className={stylesTable.Table_td}></th> : null}
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