import { FunctionComponent, ReactElement, useEffect } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./DoctorCabinetPage.module.css";
import { useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import { useNavigate, useParams } from "react-router-dom";
import { ERoles } from "../../enums/ERoles";
import DoctorRecommendations from "./DoctorRecommendations/DoctorRecommendations";
import DoctorDiplomas from "./DoctorDiplomas/DoctorDiplomas";
import DoctorInformation from "./DoctorInformation/DoctorInformation";
import { useLazyGetDiplomasByDoctorQuery } from "../../app/services/diplomas";
import DoctorQuestions from "./DoctorQuestions/DoctorQuestions";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { user } = useAppSelector(state => state.auth);
    const {data: doctor} = useGetDoctorByUserIdQuery({id: user?.role === ERoles.DOCTOR ? user?.id : String(params.id)});
    const [getDiplomas, {data: diplomas}] = useLazyGetDiplomasByDoctorQuery();
    const navigate = useNavigate();
    useEffect(() => {
        const getDip = async () => {
            doctor && await getDiplomas(doctor.id);
        };
        getDip();
    }, [doctor]);

    return (
        <Container>
            {doctor &&  <DoctorInformation doctor={doctor}/>}

            <DoctorDiplomas diplomas={diplomas!} />

            {doctor && <DoctorRecommendations doctorId={doctor.id}/>}
            
            <DoctorQuestions />

            {/* НАВИГАЦИОННЫЙ БЛОК */}
            <div className={styles.navigationBlock}>
                <div className={styles.navLinkBox} onClick={() => {toast.info("Функционал пока недоступен");}}>
                    <p className={styles.navLink}>Вопросы</p>
                    <div className={styles.arrowDown}></div>
                </div>
                <div className={styles.navLinkBox} onClick={() => navigate(`/doctor-admin-page/${doctor?.id}`)}>
                    <p className={styles.navLink}>Перейти в админ панель</p>
                    <div className={styles.arrowRight}></div>
                </div>
            </div>
        </Container>
    );
};

export default DoctorCabinetPage;