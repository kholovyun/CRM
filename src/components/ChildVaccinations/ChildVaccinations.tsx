import { FunctionComponent, ReactElement, useEffect, useState } from "react";
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

const ChildVaccinations: FunctionComponent<IChildVaccinationsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);

    const modalCloser = () => {
        setShowAddModal(false);
    };

    const [deleteVaccination, {
        isSuccess: isSuccessDeleteVaccination,
        isError: isErrorDeleteVaccination,
        error: errorDeleteVaccination
    }] = useDeleteVaccinationMutation();

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
        <div>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={modalCloser}>
                <div>
                    <CreateVaccination modalCloser={modalCloser} childId={props.childId} />
                </div>
            </Modal> : null}
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
                        </tr>
                    </thead>
                    <tbody>
                        {props.vaccinations && props.vaccinations.map((vac) => {
                            return <VaccinationRow
                                key={vac.id}
                                vaccination={vac}
                                deleteVaccination={() => deleteVaccination(vac.id)} />;
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