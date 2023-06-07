import { FunctionComponent, ReactElement, MouseEvent, useState } from "react";
import IAllAdminsTableProps from "./IAllAdminsTableProps";
import styles from "../../AllTables.module.css";
import { ERoles } from "../../../../../enums/ERoles";
import { useBlockUserMutation } from "../../../../../app/services/users";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import Modal from "../../../../../components/UI/Modal/Modal";
import { EBtnSize } from "../../../../../enums/EBtnSize";
import Btn from "../../../../../components/UI/Btn/Btn";
import { EBtnClass } from "../../../../../enums/EBtnClass";
import IUserGetDto from "../../../../../interfaces/IUser/IUserGetDto";
import AdminRow from "./AdminRow/AdminRow";

const AllAdminsTable: FunctionComponent<IAllAdminsTableProps> = (props: IAllAdminsTableProps): ReactElement => {
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockUserMutation();

    const [stateUser, setUser] = useState<IUserGetDto | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    isBlockError && errorHandler(blockUserError);
    
    const clearModalStates = () => {
        setUser(null);
        setModalTitle("");
    };

    const cklickBlockHandler = (e: MouseEvent<HTMLDivElement>, thisUser: IUserGetDto, text: string) => {
        e.stopPropagation();
        setUser({...thisUser});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        if(stateUser && stateUser.role !== ERoles.SUPERADMIN) {
            await blockThisUser(stateUser);
        }        
        setShowModal(false);
        clearModalStates();
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        clearModalStates();
    };

    return (
        <div className={styles.Table_box}>
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span> пользователя по имени 
                            <span className={styles.violet}>{stateUser && ` ${stateUser.surname} ${stateUser.name}`}</span>?
                        </p>
                    </div>                    
                    <div className={styles.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={modalCancelHandler}
                        />
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Да"}
                            btnClass={EBtnClass.dark_active}
                            onclick={() => blockUser()}
                        />
                    </div>
                </div>
            </Modal>            
            <table className={styles.Table}>
                <thead>
                    <tr className={styles.Table_tr}>
                        <th className={styles.Table_td_right}>ФИО</th>
                        <th className={styles.Table_td_right}>Email</th>
                        <th className={styles.Table_td_right}>Tел.</th>                                        
                        <th className={styles.Table_td_right}>Блок</th>
                        <th className={styles.Table_td}>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((admin) => {
                        return (
                            <AdminRow key={admin.id} 
                                admin={admin}
                                clickBlock={(e: MouseEvent<HTMLDivElement>) => cklickBlockHandler(e, admin, admin.isBlocked ? "разблокировать" : "заблокировать")}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>        
    );
};

export default AllAdminsTable;