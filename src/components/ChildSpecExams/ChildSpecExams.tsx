import { FunctionComponent, MouseEvent, ReactElement, useEffect, useState } from "react";
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
import ISpecialistExamsGetDto from "../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";
import { useDeleteExamMutation } from "../../app/services/specExams";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";


const ChildSpecExams: FunctionComponent<IChildSpecExamsProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteExam, setShowModalDeleteExam] = useState(false);
    const [thisExam, setThisExam] = useState<ISpecialistExamsGetDto | null>(null);
    
    const addModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteExam(false);
    };

    const [deleteExam, {
        isSuccess: isSuccessDeleteExam,
        isError: isErrorDeleteExam,
        error: errorDeleteExam
    }] = useDeleteExamMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisExam: ISpecialistExamsGetDto) => {
        e.stopPropagation();
        setThisExam({...thisExam});
        setShowModalDeleteExam(true);
    };

    const clearModalState = () => {
        setThisExam(null);
    };

    const deleteThisExam = async () => {
        thisExam && await deleteExam(thisExam.id);
        setShowModalDeleteExam(false);
        clearModalState();
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorDeleteExam && errorHandler(errorDeleteExam);
    }, [isErrorDeleteExam]);

    useEffect(() => {
        isSuccessDeleteExam && toast.info("Запись об осмотре удалена");
    }, [isSuccessDeleteExam]);
    
    return (
        <div className={stylesTable.Table_box}>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={addModalCloser}>
                <div>
                    <CreateExam childId={props.childId} modalCloser={addModalCloser} />
                </div>
            </Modal> : null}
            <Modal show={showModalDeleteExam} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись об осмотре?
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
                            onclick={() => deleteThisExam()}
                        />
                    </div>
                </div>
            </Modal>
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
                                specExam={exam}
                                showModalDeleteExam={(e) => clickDeleteHandler(e, exam)}/>;
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
