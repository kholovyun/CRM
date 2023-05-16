import React, { useState } from "react";
import Pagination from "../../components/UI/Pagination/Pagination";
import Tab from "../../components/UI/Tabs/Tab/Tab";
import Tabs from "../../components/UI/Tabs/Tabs";
import styles from "./AdminPage.module.css";
import { Container } from "../../components/UI/Container/Container";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnClass } from "../../enums/EBtnClass";
import { useGetDoctorsQuery } from "../../app/services/doctors";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import TransparentLink from "../../components/UI/TransparentLink/TransparentLink";

const AdminPage: React.FunctionComponent = (): React.ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: doctors, error: getDoctorsError, isError, isLoading, refetch: doctorsRefetch } = useGetDoctorsQuery({offset: 0, limit: 10});
    
    const setErrorMsg = (err: FetchBaseQueryError | SerializedError | undefined) => {
        if (err) {
            if ("status" in err) {
                const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
                return errMsg;
            } else {
                return err.message;
            }        
        }
        return "";
    };    

    return (
        <Container>
            <div className={styles.AdminPage_column}>
                <div className={`${styles.AdminPage_btn_group} ${styles.flex_end}`}>
                    <TransparentLink title={"Зарегистрировать пользователя"} 
                        size={EBtnSize.small} 
                        pathTo={"/register-user"}/>
                </div>
                <Tabs callbacks={[doctorsRefetch]}>
                    <Tab title="Врачи">
                        {isLoading && <p>{"Идёт загрузка"}</p>}
                        {isError && getDoctorsError && <p className={styles.Error_message}>{setErrorMsg(getDoctorsError)}</p>} 
                        {
                            doctors === undefined || !doctors.length ?
                                <p>No data</p>
                                :
                                <div className={styles.Table_box}>
                                    <table className={styles.Table}>
                                        <thead>
                                            <tr className={styles.Table_tr}>
                                                <th className={styles.Table_td_right}>ФИО</th>
                                                <th className={styles.Table_td_right}>Email</th>
                                                <th className={styles.Table_td_right}>Tел.</th>
                                                <th className={styles.Table_td_right}>Специализация</th>
                                                <th className={styles.Table_td_right}>Блокировка</th>
                                                <th className={styles.Table_td_right}>Активация</th>
                                                <th className={styles.Table_td}>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doctors.map(({...doctor}) => {
                                                return (<tr className={styles.Table_tr} key={doctor.id}>
                                                    <td className={styles.Table_td_right}>{doctor.users.surname} {doctor.users.name} {doctor.users.patronim ? doctor.users.patronim : ""}</td>
                                                    <td className={styles.Table_td_right}>{doctor.users.email}</td>
                                                    <td className={styles.Table_td_right}>{doctor.users.phone}</td>
                                                    <td className={styles.Table_td_right}>{doctor.speciality}</td>
                                                    <td className={styles.Table_td_right}>{doctor.users.isBlocked? "заблокирован": ""}</td>
                                                    <td className={styles.Table_td_right}>{doctor.isActive? "активен": "неактивен"}</td>
                                                    <td className={styles.Table_td}><div className={styles.AdminPage_btn_group}>
                                                        {/* <Btn
                                                            size={EBtnSize.tiny}
                                                            title={doctor.isActive ? "Дезактивировать" : "Активировать"}
                                                            btnClass={EBtnClass.dark_active}
                                                        /> */}
                                                        <Btn
                                                            size={EBtnSize.tiny}
                                                            title={"Детали"}
                                                            btnClass={EBtnClass.dark_active}
                                                        />
                                                    </div></td>
                                                </tr>);
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                        }
                        <Pagination
                            currentPage={currentPage}
                            lastPage={doctors && doctors.length - 1 || 1}
                            maxLength={7}
                            setCurrentPage={setCurrentPage}
                        />
                    </Tab>
                    <Tab title="Родители">Родители</Tab>
                    <Tab title="Пациенты">Пациенты</Tab>
                </Tabs>
            </div>
        </Container>
    );
};

export default AdminPage;