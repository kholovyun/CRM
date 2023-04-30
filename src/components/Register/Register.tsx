import React from "react";
import styles from "./Register.module.css";

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
                <button className={styles.RegisterButton}>Создать</button>
            </form>
        </div>
    );
};

export default Register;