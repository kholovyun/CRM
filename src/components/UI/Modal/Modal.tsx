import { FunctionComponent, ReactElement } from "react";
import styles from "./Modal.module.css";
import IModalProps from "./IModalProps";

const Modal: FunctionComponent<IModalProps> = (props: IModalProps): ReactElement => {
    return (
        <>
            {props.show ? <div onClick={props.close} className={styles.modal_bg} /> : null}
            <div className={styles.modal_box}
                style={{
                    transform: props.show ? "translate(-50%, -50%)" : "translate(-50%, -100vh)",
                    opacity: props.show ? "1" : "0"
                }}
            >
                <div className={styles.modal_content}>
                    {props.children}
                </div>

            </div>
        </>
    );
};

export default Modal;
