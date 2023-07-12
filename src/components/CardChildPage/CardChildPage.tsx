import styles from "./CardChildPage.module.css";
import {FC, useState, MouseEvent} from "react";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import AvatarBox from "../AvatarBox/AvatarBox.tsx";
import { ERoles } from "../../enums/ERoles.ts";
import Modal from "../UI/Modal/Modal.tsx";
import EditChildForm from "./EditChildForm/EditChildForm.tsx";
import { SubInfoTable } from "../UI/SubInfoTable/SubInfoTable.tsx";
import { InfoTextBoxTriple } from "../UI/infoTextBoxes/infoTextBoxTriple/infoTextBoxTriple.tsx";
import AccessControl from "../../permissionRoutes/AccessControl.tsx";
import Btn from "../UI/Btn/Btn.tsx";
import { EBtnSize } from "../../enums/EBtnSize.ts";
import { EBtnTypes } from "../../enums/EBtnTypes.ts";
import { EBtnClass } from "../../enums/EBtnClass.ts";


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

    const [editChild, setEditChild] = useState(false);

    const openModal = () => {
        setEditChild(true);
    };

    const closeModal = () => {
        setEditChild(false);
    };
    return (
        <div className={styles.childBoxFirstTop}>
            <Modal show={editChild} close={closeModal}>
                <EditChildForm childData={data} closeModal={closeModal}/>
            </Modal>
            <AvatarBox 
                width={300}
                height={300}
                avatar={data.photo}
                id={data.id}
                role={ERoles.CHILD}
            />
            <SubInfoTable>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Фамилия</p>
                        <p className={styles.fieldText}>{data.surname}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Возраст</p>
                        <p className={styles.fieldText}>{age} {age > 4 || age === 0 ? "лет": age === 1 ? "год" : "года" }</p>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Имя</p>
                        <p className={styles.fieldText}>{data.name}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Рост</p>
                        <p className={styles.fieldText}>{data.height} см</p>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Отчество</p>
                        <p className={styles.fieldText}>{data.patronim}</p>
                    </div>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Вес</p>
                        <p className={styles.fieldText}>{data.weight} кг</p>
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.field}>
                        <p className={styles.fieldTitle}>Дата рождения</p>
                        <div className={styles.fieldTextBirthday}>
                            <p>{date?.getDate()}</p>
                            <p>{months[date?.getMonth()]}</p>
                            <p>{date?.getFullYear()}</p>
                        </div>
                        <p className={styles.fieldTextBirthdayTablet}>{new Date(data.dateOfBirth).toLocaleDateString()}{" "}</p>
                    </div>
                    <AccessControl allowedRoles={[ERoles.PARENT]}>
                        <div className={styles.fieldButton}>
                            <Btn 
                                onclick={openModal}
                                btnClass={EBtnClass.dark_active}
                                size={EBtnSize.tiny}
                                types={EBtnTypes.submit}
                                title="Редактировать" />
                        </div>
                    </AccessControl>
                </div>
            </SubInfoTable>
            
        </div>
    );
};

{/* <SubInfoTable>
                <div className={styles.btn_edit}>
                    <div className={styles.pencil_icon} onClick={(e: MouseEvent<HTMLDivElement>) => openModal(e)} />
                </div>
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
            </SubInfoTable> */}