import { ChildrenCardBox } from "../ChildrenCardBox/ChildrenCardBox";
import { Container } from "../../components/UI/Container/Container";
import { CardParent } from "../../components/CardParent/CardParent";
import { CardDoctor } from "../../components/CardDoctor/CardDoctor";
import styles from "./ParentCabinetPage.module.css";
import { useAppSelector } from "../../app/hooks";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useActivateParentMutation, useGetParentByUserIdQuery } from "../../app/services/parents";
import { ERoles } from "../../enums/ERoles";
import ReviewForm from "./ReviewForm/ReviewForm";
import Tabs from "../../components/UI/Tabs/Tabs";
import Tab from "../../components/UI/Tabs/Tab/Tab";
import Modal from "../../components/UI/Modal/Modal.tsx";
import ActivationForm from "../UserForms/ActivationForm/ActivationForm.tsx";
import { useLazyGetChildrenByParentQuery } from "../../app/services/children.ts";
import AskQuestionForm from "../../components/AskQuestionForm/AskQuestionForm";
import AccessControl from "../../permissionRoutes/AccessControl.tsx";

export const ParentCabinetPage: FunctionComponent = (): ReactElement => {
    const [showActivationModal, setShowActivationModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { data: parent, isError: ParentIdError, refetch } = useGetParentByUserIdQuery({ id: user?.role === ERoles.PARENT ? user?.id : String(id) });
    const [activateParent, { isSuccess }] = useActivateParentMutation();
    const [getChildren, { data: children }] = useLazyGetChildrenByParentQuery();

    const getChildrenByParent = async () => {
        if (parent) {
            await getChildren(parent.id);
        }
    };

    const activateParentHandler = async (): Promise<void> => {
        if (parent) {
            await activateParent(parent.id);
        }
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
        getChildrenByParent();
        parent && !parent.isActive ? setShowActivationModal(true) : setShowActivationModal(false);
    }, [parent]);

    return (
        <Container>
            {showActivationModal && <Modal show={showActivationModal} close={() => setShowActivationModal(false)}>
                <ActivationForm fn={activateParentHandler} />
            </Modal>}
            <div className={styles.parentboxContainer}>
                {parent && <CardParent userData={parent} />}
                {parent && <CardDoctor doctor={parent.doctors} />}
            </div>

            <AccessControl allowedRoles={[ERoles.PARENT]}>
                {parent && children !== undefined &&
                    <Tabs>
                        {children.map((ch) =>
                            <Tab key={ch.id} title={ch.name}>
                                <AskQuestionForm
                                    transparent
                                    childId={ch.id}
                                    doctorId={parent.doctorId}
                                    parentId={ch.parentId}
                                />
                            </Tab>
                        )}
                    </Tabs>
                }
            </AccessControl>
            {parent && children && <ChildrenCardBox childrenArray={children} doctorId={parent.doctorId} />}
            {user && <ReviewForm userId={user?.role === ERoles.PARENT ? user?.id : String(id)} />}
        </Container>
    );
};
