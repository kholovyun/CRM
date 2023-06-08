import styles from "./ChildTabs.module.css";
import { IchildrenProps } from "../../../interfaces/IParent/IChildren/IchildrenProps";
import { FunctionComponent, ReactElement } from "react";

export const ChildTabs: FunctionComponent<IchildrenProps> = (props: IchildrenProps): ReactElement => {
    return (
        <div className={styles.tabsBox}>
            {props.array &&
                props.array.map((el) => {
                    return (
                        <a key={el.id} className={styles.tabChildren}>
                            {el.name}
                        </a>
                    );
                })}
        </div>
    );
};
