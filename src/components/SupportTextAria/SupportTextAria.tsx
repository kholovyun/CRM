import { EBtnSize } from "../../enums/EBtnSize";
import Btn from "../UI/Btn/Btn";
import { FunctionComponent, ReactElement, useState } from "react";
import styles from "./SupportTextAria.module.css";
import { ChildTabText } from "../UI/ChildTabText/ChildTabText";

interface ISupportText {
    ph: string,
    btnName: string,
}

export const SupportTextAria: FunctionComponent<ISupportText> = (props: ISupportText): ReactElement => {
    const [userText, setUserText] = useState("");
    const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserText(e.target.value);
    };

    return (
        <ChildTabText>
            <textarea onChange={inputHandler} className={styles.childInput} placeholder={props.ph} value={userText}></textarea>
            <div className={styles.btnBox}>
                <Btn title={props.btnName} size={EBtnSize.tiny} onclick={() => console.log(userText)}/>
            </div>
        </ChildTabText>
    );
};
