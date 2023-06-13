import styles from "./CardChildPage.module.css";
import {FC} from "react";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import {SubInfoTable} from "../UI/SubInfoTable/SubInfoTable.tsx";
import {InfoTableContent} from "../UI/InfoTableContent/InfoTableContent.tsx";
import {InfoTextBoxAlone} from "../UI/infoTextBoxes/infoTextBoxAlone/infoTextBoxAlone.tsx";
import {InfoTextBoxDouble} from "../UI/infoTextBoxes/infoTextBoxDouble/infoTextBoxDouble.tsx";
import {InfoTextBoxTriple} from "../UI/infoTextBoxes/infoTextBoxTriple/infoTextBoxTriple.tsx";
import AvatarBox from "../AvatarBox/AvatarBox.tsx";
import { ERoles } from "../../enums/ERoles.ts";


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
        <div className={styles.childBoxFirstTop}>
            <AvatarBox 
                width={300}
                height={300}
                avatar={data.photo}
                id={data.id}
                role={ERoles.CHILD}

            />
            <SubInfoTable>
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
        </div>
    );
};
