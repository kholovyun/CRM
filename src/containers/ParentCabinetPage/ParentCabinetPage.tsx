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
import { useGetParentByUserIdQuery, useGetParentByIdQuery } from "../../app/services/parents";
import { ERoles } from "../../enums/ERoles";

export const ParentCabinetPage: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector((state) => state.auth);
    const getParentByUserIdQuery = useGetParentByUserIdQuery({ id: user!.id });
    const { data, refetch: refetchParentByUserId } = getParentByUserIdQuery;
    const { data: ParentIdData, isError: ParentIdError } = useGetParentByIdQuery({id: id || ""});

    const getParentHandler = async () => {
        await refetchParentByUserId();
    };

    const getParentIdHandler = async (parentId: string) => {
        parentId === undefined && redirect("/login");
        console.log("здесь id params", id);
        await useGetParentByIdQuery({ id: parentId });
    };

    if (user?.role !== ERoles.PARENT && !ParentIdData) {
        redirect("/login");
    }

    useEffect(() => {
        if (!user) {
            redirect("/login");
        } else if (user.role === ERoles.PARENT) {
            getParentHandler();
        } else {
            getParentIdHandler(id || "");
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
                {data ? <CardParent userData={data} /> : ParentIdData && <CardParent userData={ParentIdData} />}
                {data?.doctors ? <CardDoctor doc={data.doctors} /> : ParentIdData?.doctors && <CardDoctor doc={ParentIdData.doctors} />}
            </div>
            {data ? <ChildTabs array={data.children} /> : ParentIdData && <ChildTabs array={ParentIdData.children} />}
            <SupportTextAria btnName="Отправить" ph="Задать вопрос" />
            {data ? <ChildrenCardBox array={data.children} /> : ParentIdData && <ChildrenCardBox array={ParentIdData.children} />}
            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..." />
        </Container>
    );
};
