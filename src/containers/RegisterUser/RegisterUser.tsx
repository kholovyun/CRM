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
            <p className={styles.RegisterTitle}>Введите данные для регистрации</p>
            <form onSubmit={sumbitHandler} className={styles.RegisterForm}>
                <input 
                    onChange={inputChangeHandler}
                    value={form.name}
                    name="name"
                    className={styles.RegisterInput}
                    type="text"
                    placeholder="Имя" />
                <input 
                    onChange={inputChangeHandler}
                    value={form.surname}
                    name="surname"
                    className={styles.RegisterInput}
                    type="text"
                    placeholder="Фамилия" />
                <input 
                    onChange={inputChangeHandler}
                    value={form.patronim}
                    name="patronim"
                    className={`${styles.RegisterInputBig} ${styles.RegisterInput}`}
                    type="text"
                    placeholder="Отчество" />
                <input 
                    onChange={inputChangeHandler}
                    value={form.email}
                    name="email"
                    className={styles.RegisterInput}
                    type="text"
                    placeholder="Email" />
                <input 
                    onChange={inputChangeHandler}
                    value={form.phone}
                    name="phone"
                    className={styles.RegisterInput}
                    type="text"
                    placeholder="+7(---) --- -- --" />
                <button className={styles.RegisterButton}>Продолжить</button>
            </form>
        </div>
    );
};

export default RegisterUser;