import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../AllTables.module.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { EBtnSize } from "../../../../enums/EBtnSize";
import TransparentLink from "../../../../components/UI/TransparentLink/TransparentLink";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import Loader from "../../../../components/UI/Loader/Loader";
import { NavLink } from "react-router-dom";
import AllAdminsTable from "./AllAdminsTable/AllAdminsTable";
import { useGetUsersQuery } from "../../../../app/services/users";

const AllAdmins: FunctionComponent = (): ReactElement => {
    const limit = 10;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {data: admins, error: getAdminsError, isError: isGetAdminsError, isLoading} = useGetUsersQuery({offset, limit, filter: "admins"});

    useEffect(() => {
        if (admins && admins.rows) {
            admins.count % limit !== 0
                ? setPages(Math.floor(admins.count / limit) + 1)
                : setPages(admins.count / limit);
        }
    }, []);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);
    
    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    isGetAdminsError && errorHandler(getAdminsError);  

    return (
        <div className={styles.list_container}>
            <div className={styles.group_row}>
                <h1 className={styles.h1_title}>Список администраторов</h1>
                <div className={styles.add_link_colappsed}>
                    <NavLink className={`${styles.add_icon} ${styles.add_admin_icon}`}
                        to={"/admin-page/register-admin"}></NavLink>
                </div>
                <div className={styles.collapsing_link}>
                    <TransparentLink title={"Зарегистрировать администратора"} 
                        size={EBtnSize.tiny} 
                        pathTo={"/admin-page/register-admin"}/>
                </div>
            </div>
            {isLoading && <Loader/>}
            {admins === undefined || !admins.rows.length ?
                <p>Нет данных</p>
                :
                <div className={styles.list_table_box}>
                    <AllAdminsTable users={admins.rows} />
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

export default AllAdmins;