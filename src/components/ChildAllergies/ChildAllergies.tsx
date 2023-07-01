import { FunctionComponent, ReactElement, useState, useEffect } from "react";
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

const ChildAllergies: FunctionComponent<IChildAllergiesProps> = (props): ReactElement => {
    const [showAddModal, setShowAddModal] = useState(false);

    const addNewAllergyCloser = () => {
        setShowAddModal(false);
    };

    const [deleteAllergy, {
        isSuccess: isSuccessDeleteAllergy,
        isError: isErrorDeleteAllergy,
        error: errorDeleteAllergy
    }] = useDeleteAllergyMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isErrorDeleteAllergy && errorHandler(errorDeleteAllergy);
    }, [isErrorDeleteAllergy]);

    useEffect(() => {
        isSuccessDeleteAllergy && toast.info("Аллергия удалена");
    }, [isSuccessDeleteAllergy]);

    return (
        <div>
            <Modal show={showAddModal} close={addNewAllergyCloser}>
                <div>
                    <CreateAllergy childId={props.childId} modalCloser={addNewAllergyCloser} />
                </div>
            </Modal>
            <div className={styles.child_allergies}>
                <table className={stylesTable.Table}>
                    <thead>
                        <tr className={stylesTable.Table_tr}>
                            <th className={stylesTable.Table_td_right}>Вид аллергии</th>
                            <th className={stylesTable.Table_td_right}>Симптомы</th>
                            <th className={stylesTable.Table_td_right}>Провоцирующие факторы</th>
                            <th className={stylesTable.Table_td}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.allergies && props.allergies.map((allergy) => {
                            return <AllergyRow 
                                key={allergy.id} 
                                allergy={allergy} 
                                deleteAllergy={() => deleteAllergy(allergy.id)} />;
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.allergyAdd_btn}>
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

export default ChildAllergies;