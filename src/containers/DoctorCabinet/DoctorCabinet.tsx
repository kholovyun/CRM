import { useEffect, useState } from "react";
import { validationSchemaUser } from "../../schemas/validationSchemaUser";
import { Container } from "../../components/UI/Container/Container";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import defaultImage from "../../../public/avatar.jpg";
import stylesInput from "../Login/Login.module.css";
import { logout } from "../../features/authSlice";
import styles from "./DoctorCabinet.module.css";
import { useNavigate } from "react-router-dom";
import { EBtnSize } from "../../enums/EBtnSize";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../enums/EBtnTypes";

export const DoctorCabinet = () => {
    const { user } = useAppSelector(state => state.auth);
    const dispatcher = useAppDispatch();
    const navigator = useNavigate();
    const [imageLoadError, setImageLoadError] = useState(false);

    useEffect(() => {
        !user && navigator("/");
    }, [user]);

    return (
        <Container>
            <div className={styles.doctorCabinet}>
                <div className={styles.doctorTitleBox}>
                    <h1 className={styles.doctorTitle}>Cabinet</h1>
                    <Btn title={"Регистрация"} size={EBtnSize.big} onclick={() => navigator("/register-user")} />
                    <Btn title={"Выйти"} size={EBtnSize.big} onclick={() => dispatcher(logout())} />
                </div>
                <div className={styles.doctorUpdate}>
                    {imageLoadError ? (
                        <img className={styles.doctorPhoto} src={defaultImage} alt="Default" />
                    ) : (
                        <img
                            className={styles.doctorPhoto}
                            src={"/"}
                            alt="image"
                            onError={() => setImageLoadError(true)}
                        />
                    )}
                    <div>
                        <Formik
                            initialValues={{
                                email: user?.email,
                                name: user?.name,
                            }}
                            validateOnBlur
                            onSubmit={() => {
                                toast.info("Функционал пока недоступен");
                            }}
                            validationSchema={validationSchemaUser}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => (
                                <div className={styles.doctorLoginForm}>
                                    <input
                                        readOnly={true}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        className={stylesInput.LoginInput}
                                        type="text"
                                        placeholder="Email" />
                                    {touched.email && errors.email ? <p className={stylesInput.typeError}>{errors.email}</p> : <p className={stylesInput.typeText}></p>}
                                    <input
                                        readOnly={true}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        className={stylesInput.LoginInput}
                                        type="name"
                                        placeholder="Пароль" />
                                    {touched.name && errors.name ? <p className={stylesInput.typeError}>{stylesInput.name}</p> : <p className={stylesInput.typeText}></p>}
                                    <Btn disabled={!isValid} title="Редактировать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit}/>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Container>
    );
};
