import {FunctionComponent, ReactElement} from "react";
import {Container} from "../../components/UI/Container/Container";
import {CardChildPage} from "../../components/CardChildPage/CardChildPage.tsx";
import {SupportTextAria} from "../../components/SupportTextAria/SupportTextAria.tsx";
import styles from "./ChildCabinetPage.module.css";
import {CardTitle} from "../../components/UI/ParrentUi/CardTitle/CardTitle.tsx";
import ContentLink from "../../components/UI/ContentLink/ContentLink.tsx";
import {ContentLinkBox} from "../../components/UI/ContentLinkBox/ContentLinkBox.tsx";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    return (
        <Container>
            <CardChildPage />
            <div className={styles.functionalBox}>
                <CardTitle title={"Результаты последних обследований"} />
            </div>
            <SupportTextAria ph={"Задать вопрос врачу"} btnName={"Отправить"} />
            <ContentLinkBox>
                <ContentLink fn={() => console.log("Ранее заданные вопросы")} text={"Ранее заданные вопросы"}/>
                <ContentLink fn={() => console.log("Приемы у врача")} text={"Приемы у врача"}/>
                <ContentLink fn={() => console.log("Сведения о новорожденном")} text={"Сведения о новорожденном"}/>
                <ContentLink fn={() => console.log("Сведения о профилактических прививках")} text={"Сведения о профилактических прививках"}/>
                <ContentLink fn={() => console.log("Сведения об аллергическом статусе")} text={"Сведения об аллергическом статусе"}/>
                <ContentLink fn={() => console.log("Осмотры врачами других специальностей")} text={"Осмотры врачами других специальностей"}/>
            </ContentLinkBox>
        </Container>
    );
};
