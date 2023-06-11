import styles from "./CardChildPage.module.css";
import {InfoTable} from "../UI/InfoTable/InfoTable.tsx";
import {FunctionalBox} from "../UI/FunctionalBox/FunctionalBox.tsx";
import defaultImage from "../../assets/img/default-doctor.svg";

export  const  CardChildPage = () => {
    return (
        <InfoTable>
            <FunctionalBox>
                <img
                    className={styles.childAvatar}
                    onError={(e) => { e.currentTarget.src = defaultImage;}}
                    src={defaultImage}
                    // src={`${import.meta.env.VITE_BASE_URL}/uploads/doctorsImgs/${defaultImage}`}
                    alt="child" />
                <div className={styles.cardChildPage}>
                    111
                </div>
            </FunctionalBox>
        </InfoTable>
    );
};
