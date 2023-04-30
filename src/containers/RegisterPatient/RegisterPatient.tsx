import React from "react";
import styles from "./RegisterPatient.module.css";

const RegisterPatient: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.RegisterPatient}>
            <form className={styles.RegisterPatientForm}>
                <div className={styles.RegisterPatientField}>
                    <label className={styles.RegisterPatientLabel} htmlFor="">Имя</label>
                    <input 
                        className={styles.RegisterPatientInput}
                        type="text"
                        placeholder="Имя" />
                </div>
                <div className={styles.RegisterPatientField}>
                    <label className={styles.RegisterPatientLabel} htmlFor="">Фамилия</label>
                    <input 
                        className={styles.RegisterPatientInput}
                        type="text"
                        placeholder="Фамилия" />
                </div>
                <div className={styles.RegisterPatientField}>
                    <label className={styles.RegisterPatientLabel} htmlFor="">Отчество</label>
                    <input 
                        className={styles.RegisterPatientInput}
                        type="text"
                        placeholder="Отчество" />
                </div>
                <div className={styles.RegisterPatientField}>
                    <label className={styles.RegisterPatientLabel} htmlFor="">Почта</label>
                    <input 
                        className={styles.RegisterPatientInput}
                        type="text"
                        placeholder="Почта" />
                </div>
                <div className={styles.RegisterPatientField}>
                    <label className={styles.RegisterPatientLabel} htmlFor="">Телефон</label>
                    <input 
                        className={styles.RegisterPatientInput}
                        type="text"
                        placeholder="Телефон" />
                </div>
                <div className={styles.RegisterPatientField}>
                    <label className={styles.RegisterPatientLabel} htmlFor="">Лечащий врач</label>
                    <select className={styles.RegisterPatientSelect}>
                        <option>Выберите врача</option>
                    </select>
                </div>
                <button className={styles.RegisterPatientButton}>Создать</button>
            </form>
        </div>
    );
};

export default RegisterPatient;