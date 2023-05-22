import React, { useState } from "react";
// import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../AllTables.module.css";
import { useActivateDoctorMutation, useBlockDoctorMutation, useGetDoctorsQuery, } from "../../../../app/services/doctors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import Modal from "../../../../components/UI/Modal/Modal";
import { EBtnSize } from "../../../../enums/EBtnSize";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnClass } from "../../../../enums/EBtnClass";
import SwitchDiv from "../../../../components/UI/SwitchDiv/SwitchDiv";
import IDoctorWhithUser from "../../../../interfaces/IDoctor/IDoctorWhithUser";
import TransparentLink from "../../../../components/UI/TransparentLink/TransparentLink";
import { useNavigate } from "react-router-dom";

const AllDoctors: React.FunctionComponent = (): React.ReactElement => {
    const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    const {data: doctors, error: getDoctorsError, isError, isLoading} = useGetDoctorsQuery({offset: 0, limit: 10});
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockDoctorMutation();
    const [activateThisDoctor, { error: activateUserError, isError: isActivateError }] = useActivateDoctorMutation();
    const initDoctor: IDoctorWhithUser = {
        id: "",
        userId: "",
        photo: "",
        speciality: "",
        placeOfWork: "",
        experience: 0,
        isActive: true,
        price: 0,
        achievements: "",
        degree: "",
        users: {
            name: "",
            surname: "",
            patronim: "",
            email: "",
            phone: "",
            isBlocked: false
        }
    };

    const [stateDoctor, setDoctor] = useState({...initDoctor});    
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
        setDoctor({...initDoctor});
        setModalTitle("");
    };

    const cklickBlockHandler = (e: React.MouseEvent<HTMLElement>, thisDoctor: IDoctorWhithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const cklickActivateHandler = (e: React.MouseEvent<HTMLElement>, thisDoctor: IDoctorWhithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        await blockThisUser(stateDoctor);
        console.log(`Пользователь ${stateDoctor.userId} заблокирован/разблокирован`);
        setShowModal(false);
        clearModalStates();
    };

    const activateDoctor = async () => {
        await activateThisDoctor(stateDoctor);
        console.log(`Врач ${stateDoctor.id} активирован/дезактивирован`);
        setShowModal(false);
        clearModalStates();
    };

    const modalCancelHandler = () => {
        setShowModal(false);
        clearModalStates();
    };
    
    const navigateCabinetHandler = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        navigate(`/doctor-cabinet/${id}`);
    };

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список врачей</h1>
                <TransparentLink title={"Зарегистрировать врача"} 
                    size={EBtnSize.tiny} 
                    pathTo={"/admin-page/register-doctor"}/>
            </div>            
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span> пользователя по имени 
                            <span className={styles.violet}>{` ${stateDoctor.users.surname} ${stateDoctor.users.name}`}</span>?
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
                                onclick={() => blockUser()}
                            />
                            :
                            <Btn
                                size={EBtnSize.tiny}
                                title={"Да"}
                                btnClass={EBtnClass.dark_active}
                                onclick={() => activateDoctor()}
                            />
                        }
                        
                    </div>
                </div>
            </Modal>
            {isLoading && <p>{"Идёт загрузка"}</p>}
            {isError && getDoctorsError && <p className={styles.Error_message}>{setErrorMsg(getDoctorsError)}</p>}
            {isBlockError && blockUserError && <p className={styles.Error_message}>{setErrorMsg(blockUserError)}</p>}
            {isActivateError && activateUserError && <p className={styles.Error_message}>{setErrorMsg(activateUserError)}</p>} 
            {
                doctors === undefined || !doctors.length ?
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
                                        <th className={styles.Table_td_right}>Специализация</th>
                                        <th className={styles.Table_td_right}>Блок</th>
                                        <th className={styles.Table_td}>Активация</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map(({...doctor}) => {
                                        return (<tr className={styles.Table_tr} key={doctor.id} onClick={(e) => navigateCabinetHandler(e, doctor.userId)}>
                                            <td className={styles.Table_td_right}>{doctor.users.surname} {doctor.users.name} {doctor.users.patronim ? doctor.users.patronim : ""}</td>
                                            <td className={styles.Table_td_right}>{doctor.users.email}</td>
                                            <td className={styles.Table_td_right}>{doctor.users.phone}</td>
                                            <td className={styles.Table_td_right}>{doctor.speciality}</td>
                                            <td className={styles.Table_td_right}>
                                                {doctor.users.isBlocked ?
                                                    <div className={styles.switch_td} key={`bl-${doctor.id}`} onClick={(e) => cklickBlockHandler(
                                                        e, doctor, "разблокировать"
                                                    )}>
                                                        <SwitchDiv isOn={true} />
                                                    </div>
                                                    :
                                                    <div className={styles.switch_td} key={`bl-${doctor.id}`} onClick={(e) => cklickBlockHandler(
                                                        e, doctor, "заблокировать"
                                                    )}>
                                                        <SwitchDiv isOn={false}/>
                                                    </div>
                                                }
                                            </td>
                                            <td className={styles.Table_td}>
                                                {doctor.isActive ?
                                                    <div className={styles.switch_td} key={`ak-${doctor.id}`} onClick={(e) => cklickActivateHandler(
                                                        e, doctor, "дезактивировать"
                                                    )}>
                                                        <SwitchDiv isOn={true} />
                                                    </div>
                                                    :
                                                    <div className={styles.switch_td} key={`ak-${doctor.id}`} onClick={(e) => cklickActivateHandler(
                                                        e, doctor, "активировать"
                                                    )}>
                                                        <SwitchDiv isOn={false}/>
                                                    </div>
                                                }
                                            </td>
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

export default AllDoctors;