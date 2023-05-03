import React, {useState, FormEvent, ChangeEvent} from "react";
import styles from "./RegisterUser.module.css";
import IUserCreateDto from "../../interfaces/IUser/IUserCreateDto";
import { ERoles } from "../../enums/ERoles";
import { useCreateUserMutation } from "../../app/services/users";

const RegisterUser: React.FunctionComponent = (): React.ReactElement => {
    const [form, setForm] = useState<IUserCreateDto>({
        name: "",
        surname: "",
        phone: "",
        patronim: "",
        email: "",
        role: ERoles
    });
    
    const [createUser] = useCreateUserMutation();

    const sumbitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser(form);
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
 
    return (
        <div className={styles.Register}>
            <form onSubmit={sumbitHandler} className={styles.RegisterForm}>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Имя</label>
                    <input 
                        onChange={inputChangeHandler}
                        value={form.name}
                        name="name"
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Имя" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Фамилия</label>
                    <input 
                        onChange={inputChangeHandler}
                        value={form.surname}
                        name="surname"
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Фамилия" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Отчество</label>
                    <input 
                        onChange={inputChangeHandler}
                        value={form.patronim}
                        name="patronim"
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Отчество" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Почта</label>
                    <input 
                        onChange={inputChangeHandler}
                        value={form.email}
                        name="email"
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Почта" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Телефон</label>
                    <input 
                        onChange={inputChangeHandler}
                        value={form.phone}
                        name="phone"
                        className={styles.RegisterInput}
                        type="text"
                        placeholder="Телефон" />
                </div>
                <div className={styles.RegisterField}>
                    <label className={styles.RegisterLabel} htmlFor="">Роль пользователя</label>
                    <select 
                        value={form.role} 
                        name="role"
                        onChange={inputChangeHandler}
                        className={styles.RegisterSelect}>
                        <option value={0}>Выберите роль пользователя</option>
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

export default RegisterUser;