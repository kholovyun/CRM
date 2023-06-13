import styles from "./CardChildPage.module.css";
import {InfoTable} from "../UI/InfoTable/InfoTable.tsx";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";
import {FC} from "react";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import {SubInfoTable} from "../UI/SubInfoTable/SubInfoTable.tsx";
import {InfoTableContent} from "../UI/InfoTableContent/InfoTableContent.tsx";
import {InfoTextBoxAlone} from "../UI/infoTextBoxes/infoTextBoxAlone/infoTextBoxAlone.tsx";
import {InfoTextBoxDouble} from "../UI/infoTextBoxes/infoTextBoxDouble/infoTextBoxDouble.tsx";
import {InfoTextBoxTriple} from "../UI/infoTextBoxes/infoTextBoxTriple/infoTextBoxTriple.tsx";


type TChild = {
    data: IChildGetDto
};
export  const  CardChildPage: FC<TChild> = ( {data} ) => {
    const date:Date = new Date(data ? data.dateOfBirth : "");
    const dateNow:Date = new Date();
    const months:string[]=[
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const age:number = dateNow.getFullYear() - date.getFullYear();

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
                        day={`${date?.getDate()}`}
                        month={`${months[date?.getMonth()]}`}
                        year={`${date?.getFullYear()}`}
                    />
                    <InfoTextBoxAlone
                        textOne={`Возраст: ${age} ${age > 4 || age === 0 ? "лет": age === 1 ? "год" : "года" }`}
                        textTwo={`Последнее посещение: ${date && data.dateOfBirth.toLocaleString()}`}
                    />
                </InfoTableContent>
            </SubInfoTable>
        </InfoTable>
    );
};
