import { InfoTableChild } from "../UI/InfoTableChild/InfoTableChild";
import { FunctionalBox } from "../UI/FunctionalBox/FunctionalBox";
import { EBtnSize } from "../../enums/EBtnSize";
import styles from "./CardChild.module.css";
import Btn from "../UI/Btn/Btn";
import React, { FunctionComponent, ReactElement } from "react";
import { IChildrenData } from "../../interfaces/IParent/IChildren/IChildrenData";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";
import { useNavigate } from "react-router-dom";

type TChildCard = {
    child: IChildrenData;
};

export const CardChild: FunctionComponent<TChildCard> = (props): ReactElement => {
    const navigate = useNavigate();

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
                    <p>{props.child.name}</p>
                    <p>{props.child.surname}</p>
                    <p>{props.child.patronim || ""}</p>
                </div>
            </FunctionalBox>
            <FunctionalBox>
                <p >Дата рождения</p>
                <p className={styles.dateChildStyle}>{props.child.dateOfBirth}</p>
            </FunctionalBox>
            <Btn title="Подробнее" size={EBtnSize.tiny} onclick={() => navigate(`/child-cabinet/${props.child.id}`)}/>
        </InfoTableChild>
    );
};
