import { FunctionComponent, ReactElement } from "react";
import styles from "./ChildrenCardsBlock.module.css";
import IChildrenCardsBlockProps from "./IChildrenCardsBlockProps";
import ChildCard from "./ChildCard/ChildCard";

const ChildrenCardsBlock: FunctionComponent<IChildrenCardsBlockProps> = ({parentChildren, doctorId}): ReactElement => {
    return (
        <div className={styles.childrenCardsBlock}>
            {parentChildren.map(child => {
                return <ChildCard 
                    key={child.id}
                    child={child}
                    doctorId={doctorId}
                />;
            })}
            <div className={styles.addChildCard}>
                <p>Добавить ребенка</p>
            </div>
        </div>
    );
};

export default ChildrenCardsBlock;