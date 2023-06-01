import React, { useEffect } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import styles from "./ParentCabinetPage.module.css";
import { SupportTextAria } from "../../components/SupportTextAria/SupportTextAria";
import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { CardParent } from "../../components/CardParent/CardParent";
import { ChildTabs } from "../../components/UI/ChildTabs/ChildTabs";
import { useGetParentbyUserIdMutation } from "../../app/services/users";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";

export const ParentCabinetPage: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const [getParentbyUserId, {data, isSuccess}] = useGetParentbyUserIdMutation();

    const arrayChild = [
        {id: "001", name: "Рональд", surname: "Ерохин", patronim: "Васильевич", dateOfBirth:"05.01.2013"},
        {id: "002", name: "Арнольд", surname: "Митюшкин", patronim: "Васильевич", dateOfBirth:"01.01.2000"},
        {id: "003", name: "Пастернак", surname: "Ковалев", patronim: "Васильевич", dateOfBirth:"25.05.2015"},
        {id: "004", name: "Александр", surname: "Пушкин", patronim: "Васильевич", dateOfBirth:"25.05.2015"},
    ];

    isSuccess && console.log(data);
    
    const getParentHandler = async (data: string) => {
        await getParentbyUserId({id: data});
    };

    useEffect(() => {
        user && getParentHandler(user.id);
    }, []);

    return (
        <Container>
            {/* <button onClick={() => console.log(parent)}>Show Parrent</button> */}
            <div className={styles.parentboxContainer}>
                {data && <CardParent userData={{
                    registerDate: data?.registerDate,
                    name: data.users.name, 
                    surname: data.users.surname,
                    patronim: data.users.patronim,
                    phone: data.users.phone,}
                    }/>}
                {data?.doctors && <CardDoctor doc={data.doctors} />}
            </div>
            <ChildTabs array={arrayChild}/>

            <SupportTextAria btnName="Отправить" ph="Задать вопрос"/>
            
            <ChildrenCardBox array={arrayChild}/>

            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..."/>
        </Container>
    );
};
