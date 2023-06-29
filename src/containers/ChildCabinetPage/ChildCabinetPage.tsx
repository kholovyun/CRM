import {FunctionComponent, ReactElement } from "react";
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



import { useLazyGetVisitsByChildIdQuery } from "../../app/services/visits.ts";
import ChildVisits from "../../components/ChildVisits/ChildVisits.tsx";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const { data, isSuccess } = useGetChildrenByIdQuery(`${params.id}`);
    const [getQuestions, { data: questionsData }] = useLazyGetQuestionsByChildIdQuery();
    const [getVisits, { data: visitsData }] = useLazyGetVisitsByChildIdQuery();

    return (
        <Container>
            {isSuccess && <CardChildPage data={data.result} />}
            <Carousel text={"Результаты последних обследований"} />
            <SupportTextAria ph={"Задать вопрос врачу"} btnName={"Отправить"} />
            {data && <ContentLinkRow>
                <LinkWithChildren fn={() => getQuestions(data.result.id)} text={"Ранее заданные вопросы"}>
                    {data && questionsData && <ChildQuestions questions={questionsData} childId={data?.result.id}/>}
                </LinkWithChildren>
                <LinkWithChildren fn={() => getVisits(data.result.id)} text={"Приемы у врача"}>
                    {data && visitsData && <ChildVisits visits={visitsData} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Сведения о новорожденном")} text={"Сведения о новорожденном"} />
                <LinkWithChildren fn={() => console.log("Сведения о профилактических прививках")} text={"Сведения о профилактических прививках"} />
                <LinkWithChildren fn={() => console.log("Сведения об аллергическом статусе")} text={"Сведения об аллергическом статусе"} />
                <LinkWithChildren fn={() => console.log("Осмотры врачами других специальностей")} text={"Осмотры врачами других специальностей"} />
            </ContentLinkRow>
            }
        </Container>
    );
};
