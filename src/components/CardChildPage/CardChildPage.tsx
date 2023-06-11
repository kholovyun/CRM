import styles from "./CardChildPage.module.css";
import {InfoTable} from "../UI/InfoTable/InfoTable.tsx";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";

export  const  CardChildPage = () => {
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
                        <p className={styles.cardChildBoxText}>Иван</p>
                        <p className={styles.cardChildBoxText}>Иванов</p>
                    </div>
                    <div className={styles.cardChildBoxGap}>
                        <p className={styles.cardChildBoxText}>Рост</p>
                        <p className={styles.cardChildBoxText}>Вес</p>
                    </div>
                    <div className={styles.cardChildBoxOne}>
                        <p className={styles.cardChildBoxDateText}>31</p>
                        <p className={styles.cardChildBoxDateText}>Февраль</p>
                        <p className={styles.cardChildBoxDateText}>2023</p>
                    </div>
                    <div className={styles.cardChildBoxGapBootom}>
                        <p className={styles.cardChildBoxSubText}>Возраст: 5 лет</p>
                        <p className={styles.cardChildBoxSubText}>Последнее посещение: 12.03.2023</p>
                    </div>
                </div>
            </div >
        </InfoTable>
    );
};
