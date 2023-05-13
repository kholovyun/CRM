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
import { Formik, Form, Field } from "formik";
import Btn from "../../components/UI/Btn/Btn";
import { EBtnTypes } from "../../enums/EBtnTypes";

export const DoctorCabinet = () => {
    const { user } = useAppSelector(state => state.auth);
    const dispatcher = useAppDispatch();
    const navigator = useNavigate();
    const [imageLoadError, setImageLoadError] = useState(false);
    const [updateData, setUpdateData] = useState(true);

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
                                toast.info("Отправлено на модерацию");
                                setUpdateData(true);
                            }}
                            validationSchema={validationSchemaUser}
                        >
                            {({ errors, touched, isValid, handleSubmit }) => (
                                <Form className={styles.doctorLoginForm}>
                                    <Field readOnly={updateData} className={stylesInput.LoginInput} name="email" type="text" placeholder="Email" />
                                    {touched.email && errors.email ? <p className={stylesInput.typeError}>{errors.email}</p> : <p className={stylesInput.typeText}></p>}
                                    <Field readOnly={updateData} className={stylesInput.LoginInput} name="name" type="text" placeholder="Email" />
                                    {touched.name && errors.name ? <p className={stylesInput.typeError}>{errors.name}</p> : <p className={stylesInput.typeText}></p>}
                                    {updateData && <Btn disabled={!isValid} title="Редактировать" onclick={() => setUpdateData(false)} size={EBtnSize.big} types={EBtnTypes.submit} />}
                                    {!updateData && <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} />}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Container>
    );
};
