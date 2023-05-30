import React from "react";
import styles from "./SwitchDiv.module.css";
import ISwitchDivProps from "./ISwitchDivProps";

const SwitchDiv: React.FC<ISwitchDivProps> = (props: ISwitchDivProps) => {
   
    return (
        <>
            {props.isOn ?
                <div className={`${styles.switch_row} ${styles.on}`}>
                    <div className={styles.text}></div>
                    <div className={styles.white_circle}></div>                    
                </div>            
                :
                <div className={`${styles.switch_row} ${styles.off}`}>
                    <div className={styles.white_circle}></div>
                    <div className={styles.text}></div>                   
                </div>
            }
        </>
    );
};

export default SwitchDiv;