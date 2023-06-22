import styles from "./LinkWithChildren.module.css";
import {useState} from "react";

type TLinkWithClidren = {
    text: string,
    fn: () => void,
};
const LinkWithChildren = (props:TLinkWithClidren) => {
    const [showChild, SetShowChild] = useState(false);
    const showChildren = ():void => {
        SetShowChild(!showChild);
        !showChild && props.fn();
    };

    return (
        <>
            <div className={styles.linkWithChildren} onClick={showChildren}>
                <div className={styles.linkWithChildrenContext}>
                    <p className={styles.linkWithChildrenText}>{props.text}</p>
                    <div className={`${styles.linkWithChildrenArrow} ${showChild && styles.arrowUp}`}></div>
                </div>
                {showChild && <div className={styles.linkWithChildrenBox}>

                </div>}
            </div>
        </>

    );
};

export default LinkWithChildren;
