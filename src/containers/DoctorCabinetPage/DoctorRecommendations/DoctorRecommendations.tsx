import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "./DoctorRecommendations.module.css";
import IDoctorRecommendationsProps from "./IDoctorRecommendationsProps";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useCreateRecommendationMutation, useDeleteRecommendationMutation, useGetRecommendationsByDoctorQuery } from "../../../app/services/recommendations";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import Recommendation from "./Recommendation/Recommendation";
import { validationSchemaRecommendation } from "../../../schemas/validationSchemaRecommendation";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../enums/ERoles";

const DoctorRecommendations: FunctionComponent<IDoctorRecommendationsProps> = ({ doctorId }): ReactElement => {
    const {
        data: recommendations,
        isError: isErrorGetRecommendations,
        error: errorGetRecommendations,
    } = useGetRecommendationsByDoctorQuery(doctorId);

    const [createRecommendation, {
        isSuccess: isSuccessCreateRecommendation,
        isError: isErrorCreateRecommendation,
        error: errorCreateRecommendation
    }] = useCreateRecommendationMutation();

    const [deleteRecommendation, {
        isSuccess: isSuccessDeleteRecommendation,
        isError: isErrorDeleteRecommendation,
        error: errorDeleteRecommendation
    }] = useDeleteRecommendationMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    useEffect(() => {
        isSuccessCreateRecommendation && toast.info("Новая рекомендация создана");
    }, [isSuccessCreateRecommendation]);

    useEffect(() => {
        isSuccessDeleteRecommendation && toast.info("Рекомендация удалена");
    }, [isSuccessDeleteRecommendation]);

    const [showList, setShowList] = useState(false);

    const handleShowList = () => {
        setShowList(!showList);
    };

    useEffect(() => {
        isErrorCreateRecommendation && errorHandler(errorCreateRecommendation);
    }, [isErrorCreateRecommendation]);

    useEffect(() => {
        isErrorGetRecommendations && errorHandler(errorGetRecommendations);
    }, [isErrorGetRecommendations]);

    useEffect(() => {
        isErrorDeleteRecommendation && errorHandler(errorDeleteRecommendation);
    }, [isErrorDeleteRecommendation]);

    return (
        <div className={styles.recommendationBlock}>
            <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                <p className={styles.recommendationBlockTitle}>Написать рекомендацию</p>
                <Formik
                    initialValues={{
                        doctorId: doctorId || "",
                        text: ""
                    }}
                    onSubmit={(values) => {
                        createRecommendation(values);
                    }}
                    validateOnBlur
                    validationSchema={validationSchemaRecommendation}
                >
                    {({ isValid, errors, touched, handleSubmit }) => (
                        <Form className={styles.recommendationForm}>
                            <Field as={"textarea"} type="text" name="text" className={styles.textarea} />
                            {touched.text && errors.text ? <p>{errors.text}</p> : <p></p>}
                            <label className={styles.inputFileLabel}>
                                <input
                                    className={styles.fileInput}
                                    type="file"
                                    name={"image"}
                                />
                                <p className={styles.halo}>Прикрепить файл</p>
                                <div className={styles.fileIcon} />
                            </label>
                            <div className={styles.publicationBtn}>
                                <Btn disabled={!isValid} size={EBtnSize.small} onclick={handleSubmit} types={EBtnTypes.submit} title="Опубликовать" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </AccessControl>
            <div className={styles.recommendationsBottom}>
                <p>Мои рекомендации</p>
                <button
                    className={styles.recommendationBtn}
                    onClick={handleShowList}
                ><div className={`${showList ? styles.arrowUp : styles.arrowDown}`}></div></button>
            </div>
            {showList ? <div className={styles.recommendationsList}>
                {
                    recommendations && recommendations.map(el => {
                        return <Recommendation
                            key={el.id}
                            recommendation={el}
                            deleteRecommendation={() => deleteRecommendation(el.id)} />;
                    })
                }
            </div> : null}
        </div>
    );
};

export default DoctorRecommendations;