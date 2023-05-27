import React from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppSelector } from "../../app/hooks";
import styles from "./ParentCabinetPage.module.css";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { FunctionalBox } from "../../components/UI/FunctionalBox/FunctionalBox";
import { InfoTable } from "../../components/UI/InfoTable/InfoTable";

export const ParentCabinetPage: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);

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
        </Container>
    );
};
