import React from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import styles from "./ParentCabinetPage.module.css";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { FunctionalBox } from "../../components/UI/FunctionalBox/FunctionalBox";
import { InfoTable } from "../../components/UI/InfoTable/InfoTable";
import { SupportTextAria } from "../../components/SupportTextAria/SupportTextAria";
import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";

export const ParentCabinetPage: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const arrayChild = [
        {id: "001", name: "Dolf", surname: "Lungren", patronim: "Vasilevich", dateOfBirth:"05.01.2013"},
        {id: "002", name: "Terminator", surname: "Mashine", patronim: "Vasilevich", dateOfBirth:"01.01.2000"},
        {id: "003", name: "Vasiliy", surname: "Kovalev", patronim: "Vasilevich", dateOfBirth:"25.05.2015"},
    ];

    return (
            <Container>
                <div className={styles.parentboxContainer}>
                    <InfoTable>
                        <h2 className={styles.parentTitle}>Личные данные</h2>
                        <FunctionalBox>
                            <p>{user?.name} {user?.surname} {user?.patronim}</p>
                            <div className={styles.update} />
                        </FunctionalBox>
                        <FunctionalBox>
                            <p>{user?.phone}</p>
                            <div className={styles.update} />
                        </FunctionalBox>
                        <FunctionalBox>
                            <p>Дата регистрации</p>
                            <p>25.05.2023</p>
                        </FunctionalBox>
                        <FunctionalBox>
                            <p>Дата окончания подписки</p>
                            <p>25.05.2023</p>
                        </FunctionalBox>
                        <Btn title="Продлить подписку" size={EBtnSize.tiny}/>
                    </InfoTable>
                    <InfoTable>
                    <h2 className={styles.parentTitle}>Данные о враче</h2>
                    <FunctionalBox>
                        <div className={styles.docAvatar}>Img</div>
                        <div className={styles.docInfoBlock}>
                            <p className={styles.doctorText}>{user?.name}dwadawdawdawdwadawdwad</p>
                            <p className={styles.doctorText}>{user?.surname}dwadwadwadawdawdawdawd</p>
                            <p className={styles.doctorText}>{user?.patronim}dsadawdawdwadawdwa</p>
                        </div>
                    </FunctionalBox>
                    <FunctionalBox>
                        <p>Степень:</p>
                        <p>Профессор</p>
                    </FunctionalBox>
                    <FunctionalBox>
                        <p>Стаж работы</p>
                        <p>25 лет</p>
                    </FunctionalBox>
                    <Btn title="Иванов Иван" size={EBtnSize.tiny}/>
                </InfoTable>
            </div>
            <div className={styles.tabsBox}>
                <a className={styles.tab}>AltynBarysov</a>
                <a className={styles.tab}>Terminator</a>
                <a className={styles.tab}>Vasilina</a>
                <a className={styles.tab}>Aleksandr</a>
            </div>

            <SupportTextAria btnName="Отправить" ph="Задать вопрос"/>
            
            <ChildrenCardBox array={arrayChild}/>

            <SupportTextAria btnName="Отправить" ph="Поделитесь впечатлениями или пожеланиями по работе сервиса..."/>
        </Container>
    );
};
