import React from "react";
import styles from "./Register.module.css";
import { ERoles } from "../../enums/ERoles";

const Register: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.Register}>
            <form className={styles.RegisterForm}>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Имя</label>
                    <input 
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Имя" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Фамилия</label>
                    <input 
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Фамилия" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Отчество</label>
                    <input 
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Отчество" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Почта</label>
                    <input 
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Почта" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Телефон</label>
                    <input 
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Телефон" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Роль пользователя</label>
                    <select className={styles.RegisterSelect}>
                        <option>Выберите роль пользователя</option>
                        <option value={ERoles.ADMIN}>Администратор</option>
                        <option value={ERoles.DOCTOR}>Доктор</option>
                        <option value={ERoles.PARENT}>Родитель</option>
                    </select>
                </div>
                <button className={styles.RegisterButton}>Создать</button>
            </form>
        </div>
    );
};

export default Register;