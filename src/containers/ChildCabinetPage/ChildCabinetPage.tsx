import {FunctionComponent, ReactElement, useEffect} from "react";
import {Container} from "../../components/UI/Container/Container";
import {CardChildPage} from "../../components/CardChildPage/CardChildPage.tsx";
import {SupportTextAria} from "../../components/SupportTextAria/SupportTextAria.tsx";
import {Carousel} from "../../components/Сarousel/Сarousel.tsx";
import {useGetChildrenByIdQuery} from "../../app/services/children.ts";
import {useParams} from "react-router-dom";
import ChildQuestions from "../../components/ChildQuestions/ChildQuestions.tsx";
import {useLazyGetQuestionsByChildIdQuery} from "../../app/services/questions.ts";
import {ContentLinkRow} from "../../components/UI/ContentLinkRow/ContentLinkRow.tsx";
import LinkWithChildren from "../../components/UI/LinkWithChildren/LinkWithChildren.tsx";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { data, isSuccess } = useGetChildrenByIdQuery(`${params.id}`);
    const [getQuestions, { data: questionsData }] = useLazyGetQuestionsByChildIdQuery();

    useEffect(():void => {
        const getQuest = async ():Promise<void> => {
            data && await getQuestions(data.result.id);
        };
        getQuest();
    }, [data]);

    
    return (
        <Container>
            {isSuccess && <CardChildPage data={data.result} />}
            <Carousel text={"Результаты последних обследований"} />
            <SupportTextAria ph={"Задать вопрос врачу"} btnName={"Отправить"} />

            <ContentLinkRow>
                <LinkWithChildren fn={() => console.log("Ранее заданные вопросы")} text={"Ранее заданные вопросы"} ></LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Приемы у врача")} text={"Приемы у врача"} />
                <LinkWithChildren fn={() => console.log("Сведения о новорожденном")} text={"Сведения о новорожденном"} />
                <LinkWithChildren fn={() => console.log("Сведения о профилактических прививках")} text={"Сведения о профилактических прививках"} />
                <LinkWithChildren fn={() => console.log("Сведения об аллергическом статусе")} text={"Сведения об аллергическом статусе"} />
                <LinkWithChildren fn={() => console.log("Осмотры врачами других специальностей")} text={"Осмотры врачами других специальностей"} />
            </ContentLinkRow>
            {data && questionsData && <ChildQuestions questions={questionsData} childId={data?.result.id} />}
        </Container>
    );
};
