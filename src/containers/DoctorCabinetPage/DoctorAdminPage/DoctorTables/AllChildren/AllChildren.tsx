import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "../../../../AdminPage/AdminTables/AllTables.module.css";
import { useGetChildrenByDoctorQuery } from "../../../../../app/services/children";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../../interfaces/IUser/IMessage";
import Loader from "../../../../../components/UI/Loader/Loader";
import { useDoctorId } from "../../DoctorAdminPage";
import Pagination from "../../../../../components/UI/Pagination/Pagination";
import AllChildrenTable from "./AllChildrenTable/AllChildrenTable";

const AllChildren: FunctionComponent = (): ReactElement => {
    const { doctorId } = useDoctorId();
    const limit = 10;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data: children,
        error: getChildrenError,
        isError: isChildrenGetError,
        isLoading
    } = useGetChildrenByDoctorQuery({ offset, limit, id: doctorId });

    useEffect(() => {
        if (children && children.rows) {
            children.count % limit !== 0
                ? setPages(Math.floor(children.count / limit) + 1)
                : setPages(children.count / limit);
        }
    }, []);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    isChildrenGetError && errorHandler(getChildrenError);

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список пациентов</h1>
            </div>
            {isLoading && <Loader />}
            {children === undefined || !children.rows.length ? 
                <p>Нет данных</p>
                : 
                <div className={styles.list_table_box}>
                    <AllChildrenTable allChildren={children.rows} />
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

export default AllChildren;