import React from "react";
// import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../../../../AdminPage/AdminTables/AllTables.module.css";
// import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../../interfaces/IUser/IMessage";
import Loader from "../../../../../components/UI/Loader/Loader";
import { useDoctorId } from "../../DoctorAdminPage";
import { useGetParentsByDoctorQuery } from "../../../../../app/services/parents";
import { NavLink } from "react-router-dom";
import TransparentLink from "../../../../../components/UI/TransparentLink/TransparentLink";
import { EBtnSize } from "../../../../../enums/EBtnSize";

const AllParents: React.FunctionComponent = (): React.ReactElement => {
    const { doctorId } = useDoctorId();
    // const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    const {
        data: parents,
        error: getParentsError,
        isError: isParentsGetError,
        isLoading,
    } = useGetParentsByDoctorQuery({ offset: 0, limit: 10, id: doctorId });

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    isParentsGetError && errorHandler(getParentsError);

    const navigateCabinetHandler = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        console.log(`Переход на страницу родителя с userId: ${id}`);
        // navigate(`/child-cabinet/${id}`);
    };

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список родителей пациентов</h1>
                <div className={styles.add_link_colappsed}>
                    <NavLink
                        className={`${styles.add_icon} ${styles.add_parent_icon}`}
                        to={`/doctor-admin-page/${doctorId}/register-parent`}
                    ></NavLink>
                </div>
                <div className={styles.collapsing_link}>
                    <TransparentLink
                        title={"Зарегистрировать родителя"}
                        size={EBtnSize.tiny}
                        pathTo={`/doctor-admin-page/${doctorId}/register-parent`}
                    />
                </div>
            </div>
            {isLoading && <Loader />}
            {parents === undefined || !parents.length ? (
                <p>Нет данных</p>
            ) : (
                <div className={styles.list_table_box}>
                    <div className={styles.Table_box}>
                        <table className={styles.Table}>
                            <thead>
                                <tr className={styles.Table_tr}>
                                    <th className={styles.Table_td_right}>ФИО</th>
                                    <th className={styles.Table_td_right}>Email</th>
                                    <th className={styles.Table_td}>Tел.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parents.map(({ ...parent }) => {
                                    return (
                                        <tr
                                            className={styles.Table_tr}
                                            key={parent.id}
                                            onClick={(e) =>
                                                navigateCabinetHandler(e, parent.userId)
                                            }
                                        >
                                            <td className={styles.Table_td_right}>
                                                {parent.users.surname} {parent.users.name}{" "}
                                                {parent.users.patronim ? parent.users.patronim : ""}
                                            </td>
                                            <td className={styles.Table_td_right}>
                                                {parent.users.email}
                                            </td>
                                            <td className={styles.Table_td}>
                                                {parent.users.phone}
                                            </td>
                                        </tr>
                                    );
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
            )}
        </div>
    );
};

export default AllParents;
