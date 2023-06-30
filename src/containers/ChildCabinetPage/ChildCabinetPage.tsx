import { FunctionComponent, ReactElement } from "react";
import { Container } from "../../components/UI/Container/Container";
import { CardChildPage } from "../../components/CardChildPage/CardChildPage.tsx";
import { useGetChildrenByIdQuery } from "../../app/services/children.ts";
import { useLocation, useParams } from "react-router-dom";
import ChildQuestions from "../../components/ChildQuestions/ChildQuestions.tsx";
import { useLazyGetQuestionsByChildIdQuery } from "../../app/services/questions.ts";
import { ContentLinkRow } from "../../components/UI/ContentLinkRow/ContentLinkRow.tsx";
import LinkWithChildren from "../../components/UI/LinkWithChildren/LinkWithChildren.tsx";
import { ERoles } from "../../enums/ERoles.ts";
import CarouselBlock from "../../components/CarouselBlock/CarouselBlock.tsx";
import AskQuestionForm from "../../components/AskQuestionForm/AskQuestionForm.tsx";



import { useLazyGetVisitsByChildIdQuery } from "../../app/services/visits.ts";
import ChildVisits from "../../components/ChildVisits/ChildVisits.tsx";
import ChildAllergies from "../../components/ChildAllergies/ChildAllergies.tsx";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const location = useLocation();
    const doctorId: string = location.state.doctorId;
    const { data, isSuccess } = useGetChildrenByIdQuery(`${params.id}`);
    const [getQuestions, { data: questionsData }] = useLazyGetQuestionsByChildIdQuery();
    const [getVisits, { data: visitsData }] = useLazyGetVisitsByChildIdQuery();

    return (
        <Container>
            {isSuccess && <CardChildPage data={data.result} />}
            {data && <CarouselBlock
                id={data?.result.id}
                blockTitle="Результаты последних обследований"
                role={ERoles.CHILD}
            />}
            {data && <AskQuestionForm 
                childId={String(params.id)}
                doctorId={doctorId}
                parentId={data.result.parentId}
            />}
            {data && <ContentLinkRow>
                <LinkWithChildren fn={() => getQuestions(data.result.id)} text={"Ранее заданные вопросы"}>
                    {data && questionsData &&
                        <ChildQuestions questions={questionsData}
                            childData={
                                {
                                    name: data.result.name,
                                    surname: data.result.surname,
                                    patronim: data.result.patronim ? data.result.patronim : "",
                                    photo: data.result.photo
                                }
                            } />
                    }
                </LinkWithChildren>
                <LinkWithChildren fn={() => getVisits(data.result.id)} text={"Приемы у врача"}>
                    {data && visitsData && <ChildVisits visits={visitsData} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Сведения о новорожденном")} text={"Сведения о новорожденном"} />
                <LinkWithChildren fn={() => console.log("Сведения о профилактических прививках")} text={"Сведения о профилактических прививках"} />
                <LinkWithChildren fn={() => console.log("Сведения об аллергическом статусе")} text={"Сведения об аллергическом статусе"}>
                    {<ChildAllergies />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Осмотры врачами других специальностей")} text={"Осмотры врачами других специальностей"} />
            </ContentLinkRow>
            }
        </Container>
    );
};
