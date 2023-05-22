import React, { useState } from "react";
// import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../AllTables.module.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import Modal from "../../../../components/UI/Modal/Modal";
import { EBtnSize } from "../../../../enums/EBtnSize";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnClass } from "../../../../enums/EBtnClass";
import SwitchDiv from "../../../../components/UI/SwitchDiv/SwitchDiv";
import TransparentLink from "../../../../components/UI/TransparentLink/TransparentLink";
import { useBlockUserMutation, useGetUsersQuery } from "../../../../app/services/users";
import IUserGetDto from "../../../../interfaces/IUser/IUserGetDto";
import { ERoles } from "../../../../enums/ERoles";

const AllAdmins: React.FunctionComponent = (): React.ReactElement => {
    
    // const [currentPage, setCurrentPage] = useState(1);
    const {data: admins, error: getAdminsError, isError: isGetAdminsError, isLoading} = useGetUsersQuery({offset: 0, limit: 10, filter: "admins"});
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockUserMutation();
    const initUser: IUserGetDto = {
        id: "",
        role: ERoles.ADMIN,
        email: "",
        phone: "",
        name: "",
        surname: "",
        patronim: "",
        isBlocked: false        
    };

    const [stateUser, setUser] = useState({...initUser});
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);    
    
    const setErrorMsg = (err: FetchBaseQueryError | SerializedError | undefined) => {
        if (err) {
            if ("status" in err) {
                const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
                return errMsg;
            } else if ("message" in err) {
                return err.message;
            } else {
                return String(err);
            }        
        }
        return "";
    };

    const clearModalStates = () => {
        setUser({...initUser});
        setModalTitle("");
    };

    const cklickBlockHandler = (e: React.MouseEvent<HTMLElement>, thisUser: IUserGetDto, text: string) => {
        e.stopPropagation();
        setUser({...thisUser});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        if(stateUser.role !== ERoles.SUPERADMIN) {
            await blockThisUser(stateUser);
            console.log(`Пользователь ${stateUser.id} заблокирован/разблокирован`);
        }        
        setShowModal(false);
        clearModalStates();
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        clearModalStates();
    };    

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список врачей</h1>
                <TransparentLink title={"Зарегистрировать администратора"} 
                    size={EBtnSize.tiny} 
                    pathTo={"/admin-page/register-admin"}/>
            </div>
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span> пользователя по имени 
                            <span className={styles.violet}>{` ${stateUser.surname} ${stateUser.name}`}</span>?
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
            {isLoading && <p>{"Идёт загрузка"}</p>}
            {isGetAdminsError && getAdminsError && <p className={styles.Error_message}>{setErrorMsg(getAdminsError)}</p>}
            {isBlockError && blockUserError && <p className={styles.Error_message}>{setErrorMsg(blockUserError)}</p>}
            {
                admins === undefined || !admins.length ?
                    <p>No data</p>
                    :
                    <div className={styles.list_table_box}>
                        <div className={styles.Table_box}>
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
                                    {admins.map((admin) => {
                                        return (<tr className={styles.Table_tr} key={admin.id}>
                                            <td className={styles.Table_td_right}>{admin.surname} {admin.name} {admin.patronim ? admin.patronim : ""}</td>
                                            <td className={styles.Table_td_right}>{admin.email}</td>
                                            <td className={styles.Table_td_right}>{admin.phone}</td>
                                            <td className={styles.Table_td_right}>
                                                {admin.role === ERoles.SUPERADMIN ? 
                                                    <p></p>
                                                    :
                                                    admin.isBlocked ?
                                                        <div className={styles.switch_td} onClick={(e) => cklickBlockHandler(
                                                            e, admin, "разблокировать"
                                                        )}>
                                                            <SwitchDiv key={`bl-${admin.id}`} isOn={true} />
                                                        </div>
                                                        :
                                                        <div className={styles.switch_td} onClick={(e) => cklickBlockHandler(
                                                            e, admin, "заблокировать"
                                                        )}>
                                                            <SwitchDiv key={`notbl-${admin.id}`} isOn={false}/>
                                                        </div>
                                                }                                                
                                            </td>
                                            <td className={styles.Table_td}>{admin.role}</td>
                                        </tr>);
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* <Pagination
                            currentPage={currentPage}
                            lastPage={doctors && doctors.length - 1 || 1}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                        /> */}
                    </div> 
            }            
        </div>
    );
};

export default AllAdmins;