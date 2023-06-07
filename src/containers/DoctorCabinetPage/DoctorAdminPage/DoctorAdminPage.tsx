import { Outlet, useOutletContext, useParams } from "react-router-dom";
import styles from "../../AdminPage/AdminPage.module.css";
import DoctorSideBar from "./DoctorSideBar/DoctorSideBar";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { ContextTypeDoctor } from "../../../types/ContextTypeDoctor";

const DoctorAdminPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const [doctorId, setDoctorId] = useState<{ doctorId: string }>({ doctorId: String(params.id) });
    
    useEffect(() => {
        setDoctorId({ doctorId: String(params.id) });
    }, []);

    return (
        <div className={styles.AdminPage_row}>
            <DoctorSideBar doctorId={String(params.id)} />
            <div className={styles.Admin_page_content}>
                <Outlet context={{ ...doctorId }} />
            </div>
        </div>
    );
};

export const useDoctorId = () => {
    return useOutletContext<ContextTypeDoctor>();
};

export default DoctorAdminPage;
