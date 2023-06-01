import { SupportTextAria } from "../../components/SupportTextAria/SupportTextAria";
import { useGetParentbyUserIdMutation } from "../../app/services/users";
import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { Container } from "../../components/UI/Container/Container";
import { CardParent } from "../../components/CardParent/CardParent";
import { ChildTabs } from "../../components/UI/ChildTabs/ChildTabs";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";
import styles from "./ParentCabinetPage.module.css";
import { useAppSelector } from "../../app/hooks";
import React, { useEffect } from "react";

export const ParentCabinetPage: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const [getParentbyUserId, {data, isSuccess}] = useGetParentbyUserIdMutation();

    const getParentHandler = async (data: string) => {
        await getParentbyUserId({id: data});
    };

    isSuccess && console.log(data);
    
    useEffect(() => {
        user && getParentHandler(user.id);
    }, []);

    return (
        <Container>
            <div className={styles.parentboxContainer}>
                {data && <CardParent userData={{
                    registerDate: data?.registerDate,
                    name: data.users.name, 
                    surname: data.users.surname,
                    patronim: data.users.patronim,
                    phone: data.users.phone,
                    subscriptions: data.users.subscriptions[0].endDate    
                }
                }/>}
                {data?.doctors && <CardDoctor doc={data.doctors} />}
            </div>
            {data && <ChildTabs array={data.children}/>}
            <SupportTextAria btnName="Отправить" ph="Задать вопрос"/>
            {data && <ChildrenCardBox array={data.children}/>}
            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..."/>
        </Container>
    );
};
