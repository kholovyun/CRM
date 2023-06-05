import { FunctionComponent, ReactElement, useEffect } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./DoctorCabinetPage.module.css";
import { useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import { useParams } from "react-router-dom";
import { ERoles } from "../../enums/ERoles";
import RecommendationsBlock from "./RecommendationsBlock/RecommendationsBlock";
import DoctorDiplomas from "./DoctorDiplomas/DoctorDiplomas";
import DoctorInformation from "./DoctorInformation/DoctorInformation";
import { useLazyGetDiplomasByDoctorQuery } from "../../app/services/diplomas";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { user } = useAppSelector(state => state.auth);
    const {data: doctor} = useGetDoctorByUserIdQuery({id: user?.role === ERoles.DOCTOR ? user?.id : String(params.id)});
    
    const [getDiplomas, {data: diplomas}] = useLazyGetDiplomasByDoctorQuery()

    useEffect(() => {
        const getDip = async () => {
            doctor && await getDiplomas(doctor.id);
        }
        getDip()
    }, [doctor])

    return (
        <Container>
            <DoctorInformation doctor={doctor!} />

            <DoctorDiplomas diplomas={diplomas!} />

            <RecommendationsBlock doctorData={doctor!}/>
            
            {/* ВОПРОСЫ */}
            <div className={styles.questionsBlock}>
                <div className={styles.questionsBlockLeft}>
                    <p className={styles.questionsBlockLeftTop}>Новые вопросы</p>
                </div>
                <div className={styles.questionsBlockRight}>
                </div>
            </div>

            {/* НАВИГАЦИОННЫЙ БЛОК */}

            <div className={styles.navigationBlock}>
                <div className={styles.navLinkBox} onClick={() => {toast.info("Функционал пока недоступен");}}>
                    <p className={styles.navLink}>Вопросы</p>
                    <div className={styles.arrowDown}></div>
                </div>
                <div className={styles.navLinkBox}>
                    <p className={styles.navLink}>Перейти в админ панель</p>
                    <div className={styles.arrowRight}></div>
                </div>
            </div>
        </Container>
        
    );
};

export default DoctorCabinetPage;