import { FunctionComponent, ReactElement, useState } from "react";
import IChildAllergiesProps from "./IChildAllergiesProps";
import styles from "./ChildAllergies.module.css";
import stylesTable from "../../containers/AdminPage/AdminTables/AllTables.module.css";
import AllergyRow from "./AllergyRow/AllergyRow";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";
import Modal from "../UI/Modal/Modal";

const ChildAllergies: FunctionComponent<IChildAllergiesProps> = (props): ReactElement => {
    const [showAddModal, setShowAddModal] = useState(false);

    const addNewAllergyCloser = () => {
        setShowAddModal(false);
    };

    return (
        <div>
            <Modal show={showAddModal} close={addNewAllergyCloser}>
                <div>djhdfdxfd</div>
            </Modal>
            <div className={styles.child_allergies}>
                <table className={stylesTable.Table}>
                    <thead>
                        <tr className={stylesTable.Table_tr}>
                            <th className={styles.allergiesTable_td_right}>Вид аллергии</th>
                            <th className={styles.allergiesTable_td_right}>Симптомы</th>
                            <th className={styles.allergiesTable_td}>Провоцирующие факторы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.allergies && props.allergies.map((allergy) => {
                            return <AllergyRow key={allergy.id} allergy={allergy} />;
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.allergyAdd_btn}>
                <Btn
                    onclick={() => setShowAddModal(true)}
                    title="Добавить"
                    size={EBtnSize.small}
                    types={EBtnTypes.button}
                    btnClass={EBtnClass.dark_active} />
            </div>
        </div>
    );
};

export default ChildAllergies;