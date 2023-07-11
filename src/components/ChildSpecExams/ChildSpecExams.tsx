import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import IChildSpecExamsProps from "./IChildSpecExamsProps";
import stylesTable from "../../containers/AdminPage/AdminTables/AllTables.module.css";
import styles from "./ChildSpecExams.module.css";
import { useAppSelector } from "../../app/hooks";
import { ERoles } from "../../enums/ERoles";
import Modal from "../UI/Modal/Modal";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";
import SpecExamRow from "./SpecExamsRow/SpecExamsRow";
import CreateExam from "./CreateExam/CreateExam";


const ChildSpecExams: FunctionComponent<IChildSpecExamsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);

    const modalAddCloser = () => {
        setShowAddModal(false);
    };
    
    return (
        <div className={stylesTable.Table_box}>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={modalAddCloser}>
                <div>
                    <CreateExam childId={props.childId} modalCloser={modalAddCloser} />
                </div>
            </Modal> : null}
            <div className={styles.child_specExams}>
                <table className={stylesTable.Table}>
                    <thead>
                        <tr className={stylesTable.Table_tr}>
                            <th className={stylesTable.Table_td_right}>Специальность</th>
                            <th className={stylesTable.Table_td_right}>ФИО врача</th>
                            <th className={stylesTable.Table_td_right}>Дата</th>
                            <th className={stylesTable.Table_td_right}>Заключение</th>
                            <th className={user?.role === ERoles.DOCTOR ? stylesTable.Table_td_right : stylesTable.Table_td}>Рекомендации</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.specExams && props.specExams.map((exam) => {
                            return <SpecExamRow
                                key={exam.id}
                                specExam={exam}/>;
                        })}
                    </tbody>
                </table>
            </div>
            {user?.role === ERoles.DOCTOR ? <div className={styles.specExamsAdd_btn}>
                <Btn
                    onclick={() => setShowAddModal(true)}
                    title="Добавить"
                    size={EBtnSize.small}
                    types={EBtnTypes.button}
                    btnClass={EBtnClass.dark_active} />
            </div> : null}
        </div>
    );
};

export default ChildSpecExams;
