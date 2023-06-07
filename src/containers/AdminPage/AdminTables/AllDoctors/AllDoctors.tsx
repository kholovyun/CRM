import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import styles from "../AllTables.module.css";
import { useGetDoctorsQuery } from "../../../../app/services/doctors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { EBtnSize } from "../../../../enums/EBtnSize";
import TransparentLink from "../../../../components/UI/TransparentLink/TransparentLink";
import { NavLink } from "react-router-dom";
import { IErrorResponse } from "../../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import Loader from "../../../../components/UI/Loader/Loader";
import AllDoctorsTable from "./AllDoctorsTable/AllDoctorsTable";

const AllDoctors: FunctionComponent = (): ReactElement => {    
    const limit = 10;
    const [pages, setPages] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data: doctors, 
        error: getDoctorsError, 
        isError: isDoctorsGetError, 
        isLoading
    } = useGetDoctorsQuery({offset, limit});

    useEffect(() => {
        if (doctors && doctors.rows) {
            doctors.count % limit !== 0
                ? setPages(Math.floor(doctors.count / limit) + 1)
                : setPages(doctors.count / limit);
        }
    }, []);

    useEffect(() => {
        setOffset((currentPage - 1) * limit);
    }, [currentPage]);

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    isDoctorsGetError && errorHandler(getDoctorsError);

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
            {isLoading && <Loader/>}
            {doctors === undefined || !doctors.rows.length ?
                <p>Нет данных</p>
                :
                <div className={styles.list_table_box}>
                    <AllDoctorsTable doctors={doctors.rows} />
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

export default AllDoctors;