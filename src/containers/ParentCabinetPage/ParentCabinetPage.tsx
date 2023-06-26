import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { Container } from "../../components/UI/Container/Container";
import { CardParent } from "../../components/CardParent/CardParent";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";
import styles from "./ParentCabinetPage.module.css";
import { useAppSelector } from "../../app/hooks";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useGetParentByUserIdQuery } from "../../app/services/parents";
import { ERoles } from "../../enums/ERoles";
import ReviewForm from "./ReviewForm/ReviewForm";
import Tabs from "../../components/UI/Tabs/Tabs";
import Tab from "../../components/UI/Tabs/Tab/Tab";

export const ParentCabinetPage: FunctionComponent = (): ReactElement => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { data, isError: ParentIdError } = useGetParentByUserIdQuery({ id: user?.role === ERoles.PARENT ? user?.id : String(id) });

    useEffect(() => {
        if (!user) {
            redirect("/login");
        }
    }, []);

    useEffect(() => {
        if (ParentIdError && !id) {
            navigate("/login");
        }
    }, [ParentIdError]);

    return (
        <Container>
            <div className={styles.parentboxContainer}>
                {data && <CardParent userData={data} />}
                {data && <CardDoctor doc={data.doctors} />}
            </div>
            {data &&
                <Tabs>
                    {data.children.map((ch) =>
                        <Tab key={ch.id} title={ch.name}>
                            <div>Здесь должен быть компонент формы создания вопроса, принимающий ребёнка, из которого понадобятся id ребёнка {ch.id} и
                                id родителя {ch.parentId}, а также принимающий id врача {data.doctorId}
                            </div>
                        </Tab>
                    )}
                </Tabs>
            }
            {data && <ChildrenCardBox array={data.children} />}
            {user && <ReviewForm userId={user?.role === ERoles.PARENT ? user?.id : String(id)} />}
        </Container>
    );
};
