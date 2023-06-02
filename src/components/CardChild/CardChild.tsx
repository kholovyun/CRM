import { InfoTableChild } from "../UI/InfoTableChild/InfoTableChild";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardChild.module.css";
import Btn from "../UI/Btn/Btn";
import React from "react";
import { IChildrenData } from "../../interfaces/IParent/IChildren/IChildrenData";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";

type TChildCard = {
    child: IChildrenData;
};

export const CardChild: React.FC<TChildCard> = (props) => {
    console.log(props);
    return (
        <InfoTableChild>
            <FunctionalBox>
                <img
                    className={styles.childAvatar}
                    onError={(e) => {
                        e.currentTarget.src = defaultImage;
                    }}
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/childrenImgs/${
                        props.child.photo
                    }`}
                    alt={"childPhoto"}
                />
                <div className={styles.docInfoBlock}>
                    <p className={styles.doctorText}>{props.child.name}</p>
                    <p className={styles.doctorText}>{props.child.surname}</p>
                    <p className={styles.doctorText}>{props.child.patronim || ""}</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p className={styles.doctorText}>Дата рождения</p>
                <p className={styles.dateChildStyle}>{props.child.dateOfBirth}</p>
            </FunctionalBox>
            <Btn title="Подробнее" size={EBtnSize.tiny} />
        </InfoTableChild>
    );
};
