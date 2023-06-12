import styles from "./CardChildPage.module.css";
import {InfoTable} from "../UI/InfoTable/InfoTable.tsx";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";
import {FC} from "react";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import { DateTime } from "luxon";


type TChild = {
    data: IChildGetDto
};
export  const  CardChildPage: FC<TChild> = ( {data} ) => {
    const date = new Date(data ? data.dateOfBirth : "");
    const dateNow = new Date();
    const dateTime = DateTime.fromISO(data ? `${data.dateOfBirth}` : "12-06-2023 12:34:56 PM");
    dateTime && dateTime.setLocale("ru");

    return (
        <InfoTable>
            <div className={styles.cardChildBox}>
                <img
                    className={styles.childAvatar}
                    onError={(e) => { e.currentTarget.src = defaultImage;}}
                    src={defaultImage}
                    alt="child" />
                <div className={styles.cardChildPage}>
                    <div className={styles.cardChildBoxGap}>
                        <p className={styles.cardChildBoxText}>{data?.name}</p>
                        <p className={styles.cardChildBoxText}>{data?.surname}</p>
                    </div>
                    <div className={styles.cardChildBoxGap}>
                        <p className={styles.cardChildBoxText}>{data?.height}</p>
                        <p className={styles.cardChildBoxText}>{data?.weight}</p>
                    </div>
                    <div className={styles.cardChildBoxOne}>
                        <p className={styles.cardChildBoxDateText}>{date?.getDay()}</p>
                        <p className={styles.cardChildBoxDateText}>{dateTime.toFormat("LLLL")}</p>
                        <p className={styles.cardChildBoxDateText}>{date?.getFullYear()}</p>
                    </div>
                    <div className={styles.cardChildBoxGapBootom}>
                        <p className={styles.cardChildBoxSubText}>Возраст: {dateNow.getFullYear() - date.getFullYear()} лет</p>
                        <p className={styles.cardChildBoxSubText}>Последнее посещение: {date && dateNow.toLocaleString()}</p>
                    </div>
                </div>
            </div >
        </InfoTable>
    );
};
