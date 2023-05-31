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
import IDoctorWithUser from "../../../../interfaces/IDoctor/IDoctorWithUser";
import TransparentLink from "../../../../components/UI/TransparentLink/TransparentLink";
import { NavLink, useNavigate } from "react-router-dom";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import Loader from "../../../../components/UI/Loader/Loader";

const AllDoctors: React.FunctionComponent = (): React.ReactElement => {
    const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    const {data: doctors, error: getDoctorsError, isError: isDoctorsGetError, isLoading} = useGetDoctorsQuery({offset: 0, limit: 10});
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockDoctorMutation();
    const [activateThisDoctor, { error: activateError, isError: isActivateError }] = useActivateDoctorMutation();

    const [stateDoctor, setDoctor] = useState<IDoctorWithUser | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    isDoctorsGetError && errorHandler(getDoctorsError);
    isBlockError && errorHandler(blockUserError);
    isActivateError && errorHandler(activateError);

    const clearModalStates = () => {
        setDoctor(null);
        setModalTitle("");
    };

    const cklickBlockHandler = (e: React.MouseEvent<HTMLElement>, thisDoctor: IDoctorWithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const cklickActivateHandler = (e: React.MouseEvent<HTMLElement>, thisDoctor: IDoctorWithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        stateDoctor && await blockThisUser(stateDoctor);
        stateDoctor && console.log(`Пользователь ${stateDoctor.userId} заблокирован/разблокирован`);
        setShowModal(false);
        clearModalStates();
    };

    const activateDoctor = async () => {
        stateDoctor && await activateThisDoctor(stateDoctor);
        stateDoctor && console.log(`Врач ${stateDoctor.id} активирован/дезактивирован`);
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
                <div className={styles.add_link_colappsed}>
                    <NavLink className={`${styles.add_icon} ${styles.add_doctor_icon}`}
                        to={"/admin-page/register-doctor"}></NavLink>
                </div>
                <div className={styles.collapsing_link}>
                    <TransparentLink title={"Зарегистрировать врача"} 
                        size={EBtnSize.tiny} 
                        pathTo={"/admin-page/register-doctor"}/>
                </div>                
            </div>            
            <Modal
                show={showModal}
                close={modalCancelHandler}>
                <div className={styles.modal_flex_column}>
                    <div className={styles.title_box}>
                        <p className={styles.modal_title}>
                            Вы уверены, что хотите <span className={styles.violet}>{modalTitle}</span> пользователя по имени 
                            <span className={styles.violet}>{stateDoctor && ` ${stateDoctor.users.surname} ${stateDoctor.users.name}`}</span>?
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
            {isLoading && <Loader/>}
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