import { FunctionComponent, ReactElement } from "react";
import styles from "./ChildrenCardBox.module.css";
import { CardChild } from "../../components/CardChild/CardChild";
import { CardAddSome } from "../../components/CardAddSome/CardAddSome";
import IChildrenCardBoxProps from "./IChildrenCardBoxProps";

export const ChildrenCardBox: FunctionComponent<IChildrenCardBoxProps> = (props: IChildrenCardBoxProps): ReactElement => {
    return (
        <div className={styles.childBoxInf}>
            {props.childrenArray.length &&
                props.childrenArray.map((child) => {
                    return <CardChild
                        key={child.id}
                        child={child}
                        doctorId={props.doctorId} />;
                })}
            <CardAddSome title="Добавить ребенка" />
        </div>
    );
};
