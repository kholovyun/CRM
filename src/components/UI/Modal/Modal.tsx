import React from "react";
import styles from "./Modal.module.css";
import IModalProps from "./IModalProps";

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
    return (
        <>
            {props.show ? <div onClick={props.close} className={styles.modal_bg} /> : null}
            <div className={styles.modal_box}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0"
                }}
            >
                {props.children}
            </div>
        </>
    );
};

export default Modal;
