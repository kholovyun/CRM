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
import { useLazyGetAllergiesByChildIdQuery } from "../../app/services/allergies.ts";
import ChildVaccinations from "../../components/ChildVaccinations/ChildVaccinations.tsx";
import { useLazyGetVaccinationsByChildIdQuery } from "../../app/services/vaccinations.ts";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    const params = useParams();
    const location = useLocation();
    const doctorId: string = location.state.doctorId;
    const { data, isSuccess } = useGetChildrenByIdQuery(`${params.id}`);
    const [getQuestions, { data: questionsData }] = useLazyGetQuestionsByChildIdQuery();
    const [getVisits, { data: visitsData }] = useLazyGetVisitsByChildIdQuery();
    const [getAllergies, { data: allergiesData }] = useLazyGetAllergiesByChildIdQuery();
    const [getVaccinations, { data: vaccinationsData}] = useLazyGetVaccinationsByChildIdQuery();
    return (
        <Container>
            {isSuccess && <CardChildPage data={data} />}
            {data && <CarouselBlock
                id={data?.id}
                blockTitle="Результаты последних обследований"
                role={ERoles.CHILD}
            />}
            {data && <AskQuestionForm
                childId={String(params.id)}
                doctorId={doctorId}
                parentId={data.parentId}
            />}
            {data && <ContentLinkRow>
                <LinkWithChildren fn={() => getQuestions(data.id)} text={"Ранее заданные вопросы"}>
                    {data && questionsData &&
                        <ChildQuestions questions={questionsData}
                            childData={
                                {
                                    name: data.name,
                                    surname: data.surname,
                                    patronim: data.patronim ? data.patronim : "",
                                    photo: data.photo
                                }
                            } />
                    }
                </LinkWithChildren>
                <LinkWithChildren fn={() => getVisits(data.id)} text={"Приемы у врача"}>
                    {data && visitsData && <ChildVisits childId={data.id} visits={visitsData} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Сведения о новорожденном")} text={"Сведения о новорожденном"} />
                <LinkWithChildren fn={() => getVaccinations(data.id)} text={"Сведения о профилактических прививках"}>
                    {data && vaccinationsData && 
                        <ChildVaccinations 
                            vaccinations={vaccinationsData}
                            childId={data.id} 
                        />
                    }
                </LinkWithChildren>
                <LinkWithChildren fn={() => getAllergies(data.id)} text={"Сведения об аллергическом статусе"}>
                    {data && allergiesData && <ChildAllergies childId={data.id} allergies={allergiesData} />}
                </LinkWithChildren>
                <LinkWithChildren fn={() => console.log("Осмотры врачами других специальностей")} text={"Осмотры врачами других специальностей"} />
            </ContentLinkRow>
            }
        </Container>
    );
};
