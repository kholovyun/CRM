import styles from "./LinkWithChildren.module.css";
import React, {useState } from "react";

type TLinkWithClidren = {
    text: string,
    fn: () => void,
    children?: React.ReactNode;
};
const LinkWithChildren = (props:TLinkWithClidren) => {
    const [showChild, SetShowChild] = useState(false);
    const showChildren = ():void => {
        SetShowChild(!showChild);
        !showChild && props.fn();
    };
    return (
        <>
            <div className={styles.linkWithChildren}>
                <div className={`${styles.linkWithChildrenContext} ${showChild && styles.linkWithChildrenTextContextOpen}`}>
                    <p className={styles.linkWithChildrenText}>{props.text}</p>
                    <div className={`${styles.linkWithChildrenArrow} ${showChild && styles.arrowUp}`} onClick={showChildren}></div>
                </div>
                {showChild && <div className={styles.linkWithChildrenBox}>
                    {props.children ? props.children : <p className={styles.linkWithChildrenTextContext}>нет данных</p>}
                </div>}
            </div>
        </>

    );
};

export default LinkWithChildren;
