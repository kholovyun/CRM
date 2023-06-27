import { FunctionComponent, ReactElement } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import "react-alice-carousel/lib/alice-carousel.css";
import { useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import { useNavigate, useParams } from "react-router-dom";
import { ERoles } from "../../enums/ERoles";
import DoctorRecommendations from "./DoctorRecommendations/DoctorRecommendations";
import CarouselBlock from "../../components/CarouselBlock/CarouselBlock";
import DoctorInformation from "./DoctorInformation/DoctorInformation";
import DoctorQuestions from "./DoctorQuestions/DoctorQuestions";
import { ContentLinkBox } from "../../components/UI/ContentLinkBox/ContentLinkBox";
import ContentLink from "../../components/UI/ContentLink/ContentLink";

const DoctorCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { data: doctor } = useGetDoctorByUserIdQuery({ id: user?.role === ERoles.DOCTOR ? user?.id : String(params.id) });
    
    const navigate = useNavigate();
    

    return (
        <Container>
            {doctor && <DoctorInformation doctor={doctor} role={user!.role} />}

            {doctor && <CarouselBlock 
                blockTitle={"Сертификаты о дополнительном образовании"} 
                id={doctor.id} 
                role={ERoles.DOCTOR} />}

            {doctor && <DoctorRecommendations role={user!.role} doctorId={doctor.id} />}
            
            <DoctorQuestions />

            {/* НАВИГАЦИОННЫЙ БЛОК */}
            <ContentLinkBox>
                <ContentLink
                    fn={() => toast.info("Функционал пока недоступен")}
                    text="Вопросы" />
                <ContentLink
                    fn={() => navigate("/admin-page/children")}
                    text="Перейти в админ панель" />
            </ContentLinkBox>
        </Container>
    );
};

export default DoctorCabinetPage;