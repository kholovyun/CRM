import React from "react";
// import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../../../../AdminPage/AdminTables/AllTables.module.css";
// import { NavLink, useNavigate } from "react-router-dom";
import { useGetChildrenByDoctorQuery } from "../../../../../app/services/children";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../../interfaces/IUser/IMessage";
import Loader from "../../../../../components/UI/Loader/Loader";
import defaultChildPhoto from "../../../../../assets/img/default-child-photo.svg";
import { useDoctorId } from "../../DoctorAdminPage";

const AllChildren: React.FunctionComponent = (): React.ReactElement => {
    const { doctorId } = useDoctorId();
    // const navigate = useNavigate();
    // const [currentPage, setCurrentPage] = useState(1);
    const {
        data: children,
        error: getChildrenError,
        isError: isChildrenGetError,
        isLoading,
    } = useGetChildrenByDoctorQuery({ offset: 0, limit: 10, id: doctorId });

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    isChildrenGetError && errorHandler(getChildrenError);

    const navigateCabinetHandler = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        console.log(`Переход на страницу ребёнка с id: ${id}`);
        // navigate(`/child-cabinet/${id}`);
    };

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список пациентов</h1>
            </div>
            {isLoading && <Loader />}
            {children === undefined || !children.length ? (
                <p>Нет данных</p>
            ) : (
                <div className={styles.list_table_box}>
                    <div className={styles.Table_box}>
                        <table className={styles.Table}>
                            <thead>
                                <tr className={styles.Table_tr}>
                                    <th className={styles.Table_td_right}>Фото</th>
                                    <th className={styles.Table_td_right}>ФИО</th>
                                    <th className={styles.Table_td_right}>Дата рождения</th>
                                    <th className={styles.Table_td_right}>Пол</th>
                                    <th className={styles.Table_td}>Вес/Рост</th>
                                </tr>
                            </thead>
                            <tbody>
                                {children.map(({ ...child }) => {
                                    return (
                                        <tr
                                            className={styles.Table_tr}
                                            key={child.id}
                                            onClick={(e) => navigateCabinetHandler(e, child.id)}
                                        >
                                            <td
                                                className={`${styles.Table_td_right} ${styles.td_for_image}`}
                                            >
                                                {child.photo !== "" ? (
                                                    <img
                                                        className={styles.childPhoto}
                                                        onError={(e) => {
                                                            e.currentTarget.src = defaultChildPhoto;
                                                        }}
                                                        src={`${
                                                            import.meta.env.VITE_BASE_URL
                                                        }uploads/childrenImgs/${child.photo}`}
                                                        alt={"фото"}
                                                    />
                                                ) : (
                                                    <img
                                                        className={styles.childPhoto}
                                                        src={defaultChildPhoto}
                                                        alt={"фото"}
                                                    />
                                                )}
                                            </td>
                                            <td className={styles.Table_td_right}>
                                                {child.surname} {child.name}{" "}
                                                {child.patronim ? child.patronim : ""}
                                            </td>
                                            <td className={styles.Table_td_right}>
                                                {new Date(child.dateOfBirth).toLocaleDateString()}
                                            </td>
                                            <td className={styles.Table_td_right}>{child.sex}</td>
                                            <td className={styles.Table_td}>
                                                {child.weight}кг/{child.height}см
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

export default AllChildren;
