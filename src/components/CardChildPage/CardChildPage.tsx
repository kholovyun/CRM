import styles from "./CardChildPage.module.css";
import {InfoTable} from "../UI/InfoTable/InfoTable.tsx";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";
import {FC} from "react";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import { DateTime } from "luxon";
import {SubInfoTable} from "../UI/SubInfoTable/SubInfoTable.tsx";
import {InfoTableContent} from "../UI/InfoTableContent/InfoTableContent.tsx";
import {InfoTextBoxAlone} from "../UI/infoTextBoxes/infoTextBoxAlone/infoTextBoxAlone.tsx";
import {InfoTextBoxDouble} from "../UI/infoTextBoxes/infoTextBoxDouble/infoTextBoxDouble.tsx";
import {InfoTextBoxTriple} from "../UI/infoTextBoxes/infoTextBoxTriple/infoTextBoxTriple.tsx";


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
            <SubInfoTable>
                <img
                    className={styles.childAvatar}
                    onError={(e) => { e.currentTarget.src = defaultImage;}}
                    src={defaultImage}
                    alt="child" />
                <InfoTableContent>
                    <InfoTextBoxDouble
                        textOne={data?.name}
                        textTwo={data?.surname}
                    />
                    <InfoTextBoxDouble
                        textOne={`${data?.height}`}
                        textTwo={`${data?.weight}`}
                    />
                    <InfoTextBoxTriple
                        day={`${date?.getDay()}`}
                        month={`${dateTime.toFormat("LLLL")}`}
                        year={`${date?.getFullYear()}`}
                    />
                    <InfoTextBoxAlone
                        textOne={`Возраст: ${dateNow.getFullYear() - date.getFullYear()} лет`}
                        textTwo={`Последнее посещение: ${date && data.dateOfBirth.toLocaleString()}`}
                    />
                </InfoTableContent>
            </SubInfoTable>
        </InfoTable>
    );
};
