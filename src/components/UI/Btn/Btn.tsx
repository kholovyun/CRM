import IBtnProps from "./IBtnProps";
import styles from "./Btn.module.css";


const Btn: React.FunctionComponent<IBtnProps> = (props: IBtnProps) => {
    return (
        <button
            style={props.style}
            onClick={props.onclick === undefined ? undefined : props.onclick}
            className={props.btnClass !== undefined ?
                `${styles.btn} ${styles[props.size || ""]} ${styles[props.btnClass]}` :
                `${styles.btn} ${styles[props.size || ""]}`
            }
            disabled={props.disabled === undefined ? false : props.disabled}
            type={props.types || "button"}
        >
            {props.title}
        </button>
    );
};

export default Btn;