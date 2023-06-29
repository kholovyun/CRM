import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { Container } from "../../components/UI/Container/Container";
import { CardParent } from "../../components/CardParent/CardParent";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";
import styles from "./ParentCabinetPage.module.css";
import { useAppSelector } from "../../app/hooks";
import {FunctionComponent, ReactElement, useEffect, useState} from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import {useActivateParentMutation, useGetParentByUserIdQuery} from "../../app/services/parents";
import { ERoles } from "../../enums/ERoles";
import ReviewForm from "./ReviewForm/ReviewForm";
import Tabs from "../../components/UI/Tabs/Tabs";
import Tab from "../../components/UI/Tabs/Tab/Tab";
import Modal from "../../components/UI/Modal/Modal.tsx";
import ActivationForm from "../UserForms/ActivationForm/ActivationForm.tsx";
import AskQuestionForm from "../../components/AskQuestionForm/AskQuestionForm";

export const ParentCabinetPage: FunctionComponent = (): ReactElement => {
    const [ showActivationModal, setShowActivationModal ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { data, isError: ParentIdError, refetch } = useGetParentByUserIdQuery({ id: user?.role === ERoles.PARENT ? user?.id : String(id) });
    const [activateParent, { isSuccess }] = useActivateParentMutation();

    const activateParentHandler = async ():Promise<void> => {
        await activateParent({id: `${data?.id}`});
    };

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

    useEffect(() => {
        if (isSuccess) {
            setShowActivationModal(false);
            refetch();
        }
    }, [isSuccess]);

    useEffect(() => {
        data && !data.isActive ? setShowActivationModal(true) : setShowActivationModal(false);
    }, [data]);

    return (
        <Container>
            {showActivationModal && <Modal show={showActivationModal} close={() => setShowActivationModal(false)}>
                <ActivationForm fn={activateParentHandler}/>
            </Modal>}
            <div className={styles.parentboxContainer}>
                {data && <CardParent userData={data} />}
                {data && <CardDoctor doc={data.doctors} />}
            </div>
            {data &&
                <Tabs>
                    {data.children.map((ch) =>
                        <Tab key={ch.id} title={ch.name}>
                            <AskQuestionForm 
                                transparent
                                childId={ch.id}
                                doctorId={data.doctorId}
                                parentId={ch.parentId}
                            />
                        </Tab>
                    )}
                </Tabs>
            }
            {data && <ChildrenCardBox array={data.children} doctorId={data.doctorId}/>}
            {user && <ReviewForm userId={user?.role === ERoles.PARENT ? user?.id : String(id)} />}
        </Container>
    );
};
