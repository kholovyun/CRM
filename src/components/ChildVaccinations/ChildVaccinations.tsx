import { FunctionComponent, ReactElement, useEffect, useState, MouseEvent } from "react";
import IChildVaccinationsProps from "./IChildVaccinationsProps";
import styles from "./ChildVaccinations.module.css";
import stylesTable from "../../containers/AdminPage/AdminTables/AllTables.module.css";
import VaccinationRow from "./VaccinationRow/VaccinationRow";
import { useDeleteVaccinationMutation } from "../../app/services/vaccinations";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import { ERoles } from "../../enums/ERoles";
import Modal from "../UI/Modal/Modal";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";
import CreateVaccination from "./CreateVaccination/CreateVaccination";
import IVaccinationGetDto from "../../interfaces/IVaccination/IVaccinationGetDto";

const ChildVaccinations: FunctionComponent<IChildVaccinationsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteVaccination, setShowModalDeleteVaccination] = useState(false);
    const [thisVaccination, setThisVaccination] = useState<IVaccinationGetDto | null>(null);
    
    const createModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteVaccination(false);
    };

    const [deleteVaccination, {
        isSuccess: isSuccessDeleteVaccination,
        isError: isErrorDeleteVaccination,
        error: errorDeleteVaccination
    }] = useDeleteVaccinationMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisVac: IVaccinationGetDto) => {
        e.stopPropagation();
        setThisVaccination({...thisVac});
        setShowModalDeleteVaccination(true);
    };

    const clearModalState = () => {
        setThisVaccination(null);
    };

    const deleteThisVaccination = async () => {
        thisVaccination && await deleteVaccination(thisVaccination.id);
        setShowModalDeleteVaccination(false);
        clearModalState();
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorDeleteVaccination && errorHandler(errorDeleteVaccination);
    }, [isErrorDeleteVaccination]);

    useEffect(() => {
        isSuccessDeleteVaccination && toast.info("Запись о вакцине удалена");
    }, [isSuccessDeleteVaccination]);

    return (
        <div className={stylesTable.Table_box}>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={createModalCloser}>
                <div>
                    <CreateVaccination modalCloser={createModalCloser} childId={props.childId} />
                </div>
            </Modal> : null}
            <Modal show={showModalDeleteVaccination} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись о вакцине?
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
                            onclick={() => deleteThisVaccination()}
                        />


                    </div>
                </div>
            </Modal>
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
                            <th className={user?.role === ERoles.DOCTOR ? stylesTable.Table_td_right : stylesTable.Table_td}>Примечание</th>
                            {user?.role === ERoles.DOCTOR ? <th className={stylesTable.Table_td}></th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {props.vaccinations && props.vaccinations.map((vac) => {
                            return <VaccinationRow
                                key={vac.id}
                                vaccination={vac}
                                showModaldeleteVaccination={(e) => clickDeleteHandler(e, vac)} />;
                        })}
                    </tbody>
                </table>
            </div>
            {user?.role === ERoles.DOCTOR ? <div className={styles.vacAdd_btn}>
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

export default ChildVaccinations;