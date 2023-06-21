import { SupportTextAria } from "../../components/SupportTextAria/SupportTextAria";
import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { Container } from "../../components/UI/Container/Container";
import { CardParent } from "../../components/CardParent/CardParent";
import { ChildTabs } from "../../components/UI/ChildTabs/ChildTabs";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";
import styles from "./ParentCabinetPage.module.css";
import { useAppSelector } from "../../app/hooks";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useGetParentByUserIdQuery } from "../../app/services/parents";
import { ERoles } from "../../enums/ERoles";
import ReviewForm from "./ReviewForm/ReviewForm";

export const ParentCabinetPage: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.auth);
    const {data, isError: ParentIdError} = useGetParentByUserIdQuery({id: user?.role === ERoles.PARENT ? user?.id : String(id)});

    useEffect(() => {
        if (!user) {
            redirect("/login");
        }
    }, []);

    useEffect(() => {
        if (ParentIdError && !id) {
            navigate("/login");
        }
    }, [ParentIdError]);

    return (
        <Container>
            <div className={styles.parentboxContainer}>
                {data && <CardParent userData={data} />}
                {data && <CardDoctor doc={data.doctors} />}
            </div>
            {data && <ChildTabs array={data.children} /> }
            <SupportTextAria btnName="Отправить" ph="Задать вопрос" />
            {data && <ChildrenCardBox array={data.children} /> }

            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..." />

            {user && <ReviewForm userId={user?.role === ERoles.PARENT ? user?.id : String(id)} />}

        </Container>
    );
};
