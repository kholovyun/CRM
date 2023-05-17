import React, { useState } from "react";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "./AllDoctors.module.css";
import { useGetDoctorsQuery } from "../../../../app/services/doctors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import Modal from "../../../../components/UI/Modal/Modal";
import { EBtnSize } from "../../../../enums/EBtnSize";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnClass } from "../../../../enums/EBtnClass";
import SwitchDiv from "../../../../components/UI/SwitchDiv/SwitchDiv";

const AllDoctors: React.FunctionComponent = (): React.ReactElement => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data: doctors, error: getDoctorsError, isError, isLoading } = useGetDoctorsQuery({offset: 0, limit: 10});

    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
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
        setId("");
        setUserName("");
        setModalTitle("");
    };

    const cklickBlockHandler = (e: React.MouseEvent<HTMLElement>, id: string, name: string, text: string) => {
        e.stopPropagation();
        setId(id);
        setShowModal(true);
        setUserName(name);
        setModalTitle(text);
    };

    const cklickActivateHandler = (e: React.MouseEvent<HTMLElement>, id: string, name: string, text: string) => {
        e.stopPropagation();
        setId(id);
        setShowModal(true);
        setUserName(name);
        setModalTitle(text);
    };

    const blockUser = (id: string) => {
        console.log(`Пользователь ${id} заблокирован/разблокирован`);
        setShowModal(false);
        clearModalStates();
    };

    const activateDoctor = (id: string) => {
        console.log(`Врач ${id} активирован/дезактивирован`);
        setShowModal(false);
        clearModalStates();
    };
    

    const modalCancelHandler = () => {
        setShowModal(false);
        clearModalStates();
    };    

    return (
        <div className={styles.doctors_container}>
            <h1 className={styles.h1_title}>Список врачей</h1>
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span> пользователя по имени 
                            <span className={styles.violet}>{userName}</span>?
                        </p>
                    </div>                    
                    <div className={styles.modal_btn_group}>
                        <Btn
                            size={EBtnSize.tiny}
                            title={"Отмена"}
                            btnClass={EBtnClass.white_active}
                            onclick={modalCancelHandler}
                        />
                        {modalTitle === "разблокировать" || modalTitle === "заблокировать" ?
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => blockUser(id)}
                            />
                            :
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => activateDoctor(id)}
                            />
                        }
                        
                    </div>
                </div>
            </Modal>
            {isLoading && <p>{"Идёт загрузка"}</p>}
            {isError && getDoctorsError && <p className={styles.Error_message}>{setErrorMsg(getDoctorsError)}</p>} 
            {
                doctors === undefined || !doctors.length ?
                    <p>No data</p>
                    :
                    <div className={styles.doctors_table_box}>
                        <div className={styles.Table_box}>
                            <table className={styles.Table}>
                                <thead>
                                    <tr className={styles.Table_tr}>
                                        <th className={styles.Table_td_right}>ФИО</th>
                                        <th className={styles.Table_td_right}>Email</th>
                                        <th className={styles.Table_td_right}>Tел.</th>
                                        <th className={styles.Table_td_right}>Блок</th>
                                        <th className={styles.Table_td_right}>Специализация</th>                                        
                                        <th className={styles.Table_td}>Активация</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map(({...doctor}) => {
                                        return (<tr className={styles.Table_tr} key={doctor.id}>
                                            <td className={styles.Table_td_right}>{doctor.users.surname} {doctor.users.name} {doctor.users.patronim ? doctor.users.patronim : ""}</td>
                                            <td className={styles.Table_td_right}>{doctor.users.email}</td>
                                            <td className={styles.Table_td_right}>{doctor.users.phone}</td>
                                            <td className={styles.Table_td_right}>
                                                {doctor.users.isBlocked ?
                                                    <div className={styles.switch_td} onClick={(e) => cklickBlockHandler(
                                                        e, doctor.userId, ` ${doctor.users.surname} ${doctor.users.name}`,
                                                        "разблокировать"
                                                    )}>
                                                        <SwitchDiv isOn={doctor.users.isBlocked} />
                                                    </div>
                                                    :
                                                    <div className={styles.switch_td} onClick={(e) => cklickBlockHandler(
                                                        e, doctor.userId, ` ${doctor.users.surname} ${doctor.users.name}`,
                                                        "заблокировать"
                                                    )}>
                                                        <SwitchDiv isOn={doctor.users.isBlocked}/>
                                                    </div>
                                                }
                                            </td>
                                            <td className={styles.Table_td_right}>{doctor.speciality}</td>
                                            <td className={styles.Table_td}>
                                                {doctor.isActive ?
                                                    <div className={styles.switch_td} onClick={(e) => cklickActivateHandler(
                                                        e, doctor.id, ` ${doctor.users.surname} ${doctor.users.name}`,
                                                        "дезактивировать"
                                                    )}>
                                                        <SwitchDiv isOn={doctor.isActive} />
                                                    </div>
                                                    :
                                                    <div className={styles.switch_td} onClick={(e) => cklickActivateHandler(
                                                        e, doctor.id, ` ${doctor.users.surname} ${doctor.users.name}`,
                                                        "активировать"
                                                    )}>
                                                        <SwitchDiv isOn={doctor.isActive}/>
                                                    </div>
                                                }
                                            </td>
                                        </tr>);
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            lastPage={doctors && doctors.length - 1 || 1}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                        />
                    </div> 
            }
            
        </div>
    );
};

export default AllDoctors;