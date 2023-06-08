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
import { useGetParentbyIdMutation, useGetParentbyUserIdMutation } from "../../app/services/parents";
import { ERoles } from "../../enums/ERoles";

export const ParentCabinetPage: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.auth);
    const [getParentbyUserId, { data }] = useGetParentbyUserIdMutation();
    const [getParentById, {data: ParentIdData, isError: ParentIdError}] = useGetParentbyIdMutation();

    const getParentHandler = async (data: string) => {
        await getParentbyUserId({id: data});
    };

    const getParentIdHandler = async (data: string) => {
        data === undefined && redirect("/login");
        console.log("здесь id params", id);
        await getParentById({id: data});
    };

    user?.role !== ERoles.PARENT && !ParentIdData && redirect("/login");

    useEffect(() => {
        !user ? redirect("/login") : user.role === ERoles.PARENT ? getParentHandler(user.id) : getParentIdHandler(id || "");
    }, []);

    useEffect(() => {
        ParentIdError && !id && navigate("/login");
    }, [ParentIdError]);

    return (
        <Container>
            <div className={styles.parentboxContainer}>
                {data ? <CardParent userData={data}/> : ParentIdData && <CardParent userData={ParentIdData}/>}
                {data?.doctors ? <CardDoctor doc={data.doctors} /> : ParentIdData?.doctors && <CardDoctor doc={ParentIdData.doctors} />}
            </div>
            {data ? <ChildTabs array={data.children}/> : ParentIdData && <ChildTabs array={ParentIdData.children}/>}
            <SupportTextAria btnName="Отправить" ph="Задать вопрос"/>
            {data ? <ChildrenCardBox array={data.children}/> : ParentIdData && <ChildrenCardBox array={ParentIdData.children}/>}
            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..."/>
        </Container>
    );
};
