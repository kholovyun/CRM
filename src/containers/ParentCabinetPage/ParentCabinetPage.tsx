import React from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import styles from "./ParentCabinetPage.module.css";
import { SupportTextAria } from "../../components/SupportTextAria/SupportTextAria";
import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { CardParent } from "../../components/CardParent/CardParent";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";
import { ChildTabs } from "../../components/UI/ChildTabs/ChildTabs";

export const ParentCabinetPage: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const arrayChild = [
        {id: "001", name: "Рональд", surname: "Ерохин", patronim: "Васильевич", dateOfBirth:"05.01.2013"},
        {id: "002", name: "Арнольд", surname: "Митюшкин", patronim: "Васильевич", dateOfBirth:"01.01.2000"},
        {id: "003", name: "Пастернак", surname: "Ковалев", patronim: "Васильевич", dateOfBirth:"25.05.2015"},
        {id: "004", name: "Александр", surname: "Пушкин", patronim: "Васильевич", dateOfBirth:"25.05.2015"},
    ];

    return (
        <Container>
            <div className={styles.parentboxContainer}>
                {user && <CardParent userData={user}/>}
                {user && <CardDoctor />}
            </div>
            <ChildTabs array={arrayChild}/>

            <SupportTextAria btnName="Отправить" ph="Задать вопрос"/>
            
            <ChildrenCardBox array={arrayChild}/>

            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..."/>
        </Container>
    );
};
