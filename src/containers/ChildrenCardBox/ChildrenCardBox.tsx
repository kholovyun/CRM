import { FunctionComponent, ReactElement } from "react";
import styles from "./ChildrenCardBox.module.css";
import { CardChild } from "../../components/CardChild/CardChild";
import { CardAddSome } from "../../components/CardAddSome/CardAddSome";
import { IchildrenProps } from "../../interfaces/IParent/IChildren/IchildrenProps";

export const ChildrenCardBox: FunctionComponent<IchildrenProps> = (props: IchildrenProps): ReactElement => {
    return (
        <div className={styles.childBoxInf}>
            {props.array.length &&
                props.array.map((child) => {
                    return <CardChild 
                        key={child.id} 
                        child={child} 
                        doctorId={props.doctorId} />;
                })}
            <CardAddSome title="Добавить ребенка" />
        </div>
    );
};
