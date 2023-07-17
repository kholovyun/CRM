import { FunctionComponent, ReactElement, useState, MouseEvent } from "react";
import IChildAllergiesProps from "./IChildAllergiesProps";
import styles from "../ChildTables.module.css";
import stylesTable from "../../../containers/AdminPage/AdminTables/AllTables.module.css";
import AllergyRow from "./AllergyRow/AllergyRow";
import Btn from "../../UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import Modal from "../../UI/Modal/Modal";
import CreateAllergy from "./CreateAllergy/CreateAllergy";
import { useDeleteAllergyMutation } from "../../../app/services/allergies";
import { useAppSelector } from "../../../app/hooks";
import { ERoles } from "../../../enums/ERoles";
import IAllergyGetDto from "../../../interfaces/IAllergy/IAllergyGetDto";
import errorHandler from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

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

    errorHandler(isErrorDeleteAllergy, errorDeleteAllergy);
    successHandler(isSuccessDeleteAllergy, "Запись об аллергии удалена");

    return (
        <>
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

            <div className={styles.child_table}>
                <div className={stylesTable.table_box}>
                    <table className={stylesTable.table}>
                        <thead>
                            <tr className={stylesTable.table_tr}>
                                <th className={stylesTable.table_td_right}>Вид аллергии</th>
                                <th className={stylesTable.table_td_right}>Симптомы</th>
                                <th className={user?.role === ERoles.DOCTOR ? stylesTable.table_td_right: stylesTable.table_td}>Провоцирующие факторы</th>
                                {user?.role === ERoles.DOCTOR ? <th className={stylesTable.table_td}></th> : null}

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
            </div>
            {user?.role === ERoles.DOCTOR ? <div className={styles.add_btn_row}>
                <Btn
                    onclick={() => setShowAddModal(true)}
                    title="Добавить"
                    size={EBtnSize.small}
                    types={EBtnTypes.button}
                    btnClass={EBtnClass.dark_active} />
            </div> : null}
        </>
    );
};

export default ChildAllergies;