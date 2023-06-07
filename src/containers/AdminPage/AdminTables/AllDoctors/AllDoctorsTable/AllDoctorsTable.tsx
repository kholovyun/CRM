import { FunctionComponent, MouseEvent, ReactElement, useState } from "react";
import IAllDoctorsTableProps from "./IAllDoctorsTableProps";
import styles from "../../AllTables.module.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import IDoctorWithUser from "../../../../../interfaces/IDoctor/IDoctorWithUser";
import { useActivateDoctorMutation, useBlockDoctorMutation } from "../../../../../app/services/doctors";
import Modal from "../../../../../components/UI/Modal/Modal";
import Btn from "../../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../../enums/EBtnSize";
import { EBtnClass } from "../../../../../enums/EBtnClass";
import DoctorRow from "./DoctorRow/DoctorRow";

const AllDoctorsTable: FunctionComponent<IAllDoctorsTableProps> = (props: IAllDoctorsTableProps): ReactElement => {
    const [blockThisUser, { error: blockUserError, isError: isBlockError }] = useBlockDoctorMutation();
    const [activateThisDoctor, { error: activateError, isError: isActivateError }] = useActivateDoctorMutation();

    const [stateDoctor, setDoctor] = useState<IDoctorWithUser | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    isBlockError && errorHandler(blockUserError);
    isActivateError && errorHandler(activateError);

    const clearModalStates = () => {
        setDoctor(null);
        setModalTitle("");
    };

    const cklickBlockHandler = (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const cklickActivateHandler = (e: MouseEvent<HTMLDivElement>, thisDoctor: IDoctorWithUser, text: string) => {
        e.stopPropagation();
        setDoctor({...thisDoctor});
        setShowModal(true);
        setModalTitle(text);
    };

    const blockUser = async () => {
        stateDoctor && await blockThisUser(stateDoctor);
        setShowModal(false);
        clearModalStates();
    };

    const activateDoctor = async () => {
        stateDoctor && await activateThisDoctor(stateDoctor);
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
                    {props.doctors.map(({...doctor}) => {
                        return (
                            <DoctorRow key={doctor.id}
                                doctor={doctor}
                                clickBlock={(e: MouseEvent<HTMLDivElement>) => cklickBlockHandler(e, doctor, doctor.users.isBlocked ? "разблокировать" : "заблокировать")}
                                clickActivate={(e: MouseEvent<HTMLDivElement>) => cklickActivateHandler(e, doctor, doctor.isActive ? "дезактивировать" : "активировать")}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllDoctorsTable;