import { FunctionComponent, ReactElement, useState, useEffect, MouseEvent } from "react";
import IChildAllergiesProps from "./IChildAllergiesProps";
import styles from "./ChildAllergies.module.css";
import stylesTable from "../../containers/AdminPage/AdminTables/AllTables.module.css";
import AllergyRow from "./AllergyRow/AllergyRow";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";
import Modal from "../UI/Modal/Modal";
import CreateAllergy from "./CreateAllergy/CreateAllergy";
import { useDeleteAllergyMutation } from "../../app/services/allergies";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { useAppSelector } from "../../app/hooks";
import { ERoles } from "../../enums/ERoles";
import IAllergyGetDto from "../../interfaces/IAllergy/IAllergyGetDto";

const ChildAllergies: FunctionComponent<IChildAllergiesProps> = (props): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalDeleteAllergy, setShowModalDeleteAllergy] = useState(false);
    const [thisAllergy, setThisAllergy] = useState<IAllergyGetDto | null>(null);

    const addModalCloser = () => {
        setShowAddModal(false);
    };

    const deleteModalCloser = () => {
        setShowModalDeleteAllergy(false);
    };

    const [deleteAllergy, {
        isSuccess: isSuccessDeleteAllergy,
        isError: isErrorDeleteAllergy,
        error: errorDeleteAllergy
    }] = useDeleteAllergyMutation();

    const clickDeleteHandler = (e: MouseEvent<HTMLButtonElement>, thisAllergy: IAllergyGetDto) => {
        e.stopPropagation();
        setThisAllergy({...thisAllergy});
        setShowModalDeleteAllergy(true);
    };

    const clearModalState = () => {
        setThisAllergy(null);
    };

    const deleteThisAllergy = async () => {
        thisAllergy && await deleteAllergy(thisAllergy.id);
        setShowModalDeleteAllergy(false);
        clearModalState();
    };

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorDeleteAllergy && errorHandler(errorDeleteAllergy);
    }, [isErrorDeleteAllergy]);

    useEffect(() => {
        isSuccessDeleteAllergy && toast.info("Запись об аллергии удалена");
    }, [isSuccessDeleteAllergy]);

    return (
        <div className={stylesTable.Table_box}>
            {user?.role === ERoles.DOCTOR ? <Modal show={showAddModal} close={addModalCloser}>
                <div>
                    <CreateAllergy childId={props.childId} modalCloser={addModalCloser} />
                </div>
            </Modal> : null}
            <Modal show={showModalDeleteAllergy} close={deleteModalCloser}>
                <div className={stylesTable.modal_flex_column}>
                    <div className={stylesTable.title_box}>
                        <p className={stylesTable.modal_title}>
                            Вы уверены, что хотите удалить запись об аллергии?
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
                            onclick={() => deleteThisAllergy()}
                        />
                    </div>
                </div>
            </Modal>

            <div className={styles.child_allergies}>
                <table className={stylesTable.Table}>
                    <thead>
                        <tr className={stylesTable.Table_tr}>
                            <th className={stylesTable.Table_td_right}>Вид аллергии</th>
                            <th className={stylesTable.Table_td_right}>Симптомы</th>
                            <th className={user?.role === ERoles.DOCTOR ? stylesTable.Table_td_right: stylesTable.Table_td}>Провоцирующие факторы</th>
                            {user?.role === ERoles.DOCTOR ? <th className={stylesTable.Table_td}></th> : null}

                        </tr>
                    </thead>
                    <tbody>
                        {props.allergies && props.allergies.map((allergy) => {
                            return <AllergyRow
                                key={allergy.id}
                                allergy={allergy}
                                showModalDeleteAllergy={(e) => clickDeleteHandler(e, allergy)} />;
                        })}
                    </tbody>
                </table>
            </div>
            {user?.role === ERoles.DOCTOR ? <div className={styles.allergyAdd_btn}>
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

export default ChildAllergies;