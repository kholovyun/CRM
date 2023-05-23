import { ITitleProps } from "./ITitleProps";
import styles from "./Title.module.css";

export const Title = (props: ITitleProps) => {
    return (
        <h1 className={styles.titleTxt}>{props.text}</h1>
    );
};
