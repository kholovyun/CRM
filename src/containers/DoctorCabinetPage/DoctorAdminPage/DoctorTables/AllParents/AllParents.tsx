import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "../../../../AdminPage/AdminTables/AllTables.module.css";
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
import Pagination from "../../../../../components/UI/Pagination/Pagination";
import AllParentsTable from "./AllParentsTable/AllParentsTable";

const AllParents: FunctionComponent = (): ReactElement => {
    const { doctorId } = useDoctorId();
    const limit = 10;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data: parents,
        error: getParentsError,
        isError: isParentsGetError,
        isLoading,
    } = useGetParentsByDoctorQuery({ offset, limit, id: doctorId });

    useEffect(() => {
        if (parents && parents.rows) {
            parents.count % limit !== 0
                ? setPages(Math.floor(parents.count / limit) + 1)
                : setPages(parents.count / limit);
        }
    }, []);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    isParentsGetError && errorHandler(getParentsError);

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
            {parents === undefined || !parents.rows.length ? 
                <p>Нет данных</p>
                :
                <div className={styles.list_table_box}>
                    <AllParentsTable parents={parents.rows} />
                    {pages > 1 ? (
                        <Pagination
                            currentPage={currentPage}
                            lastPage={pages}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                </div>
            }
        </div>
    );
};

export default AllParents;