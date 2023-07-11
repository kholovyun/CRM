import { FunctionComponent, ReactElement, useState, useEffect, MouseEvent } from "react";
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
import { useDeleteVisitMutation } from "../../app/services/visits";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import CreateVisitForm from "./CreateVisitForm/CreateVisitForm";
import IVisitGetDto from "../../interfaces/IVisit/IVisitGetDto";

const ChildVisits: FunctionComponent<IChildVisitsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteVisit, setShowModalDeleteVisit] = useState(false);
    const [thisVisit, setThisVisit] = useState<IVisitGetDto | null>(null);

    const addModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteVisit(false);
    };

    const [deleteVisit, {
        isSuccess: isSuccessDeleteVisit,
        isError: isErrorDeleteVisit,
        error: errorDeleteVisit
    }] = useDeleteVisitMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisVisit: IVisitGetDto) => {
        e.stopPropagation();
        setThisVisit({...thisVisit});
        setShowModalDeleteVisit(true);
    };

    const clearModalState = () => {
        setThisVisit(null);
    };

    const deleteThisVisit = async () => {
        thisVisit && await deleteVisit(thisVisit.id);
        setShowModalDeleteVisit(false);
        clearModalState();
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorDeleteVisit && errorHandler(errorDeleteVisit);
    }, [isErrorDeleteVisit]);

    useEffect(() => {
        isSuccessDeleteVisit && toast.info("Запись о приеме у врача удалена");
    }, [isSuccessDeleteVisit]);

    return (
        <div className={stylesTable.Table_box}>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={addModalCloser}>
                <div>
                    <CreateVisitForm childId={props.childId} modalCloser={addModalCloser} />
                </div>
            </Modal> :null}
            <Modal show={showModalDeleteVisit} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись о приеме у врача?
                        </p>
                    </div>
                    <div className={stylesTable.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={deleteModalCloser}
                        />
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Да"}
                            btnClass={EBtnClass.dark_active}
                            onclick={() => deleteThisVisit()}
                        />
                    </div>
                </div>
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
                            <th className={user?.role === ERoles.DOCTOR ? stylesTable.Table_td_right : stylesTable.Table_td}>Назначение</th>
                            {user?.role === ERoles.DOCTOR ? <th className={stylesTable.Table_td}></th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {props.visits && props.visits.map((visit) => {
                            return <VisitsRow 
                                key={visit.id} 
                                visit={visit}
                                showModaldeleteVisit={(e) => clickDeleteHandler(e, visit)} />;
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