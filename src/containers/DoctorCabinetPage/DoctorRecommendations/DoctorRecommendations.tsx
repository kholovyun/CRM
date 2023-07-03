import { FunctionComponent, ReactElement, useState } from "react";
import styles from "./DoctorRecommendations.module.css";
import IDoctorRecommendationsProps from "./IDoctorRecommendationsProps";
import { Field, Formik, Form } from "formik";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useCreateRecommendationMutation, useDeleteRecommendationMutation, useGetRecommendationsByDoctorQuery } from "../../../app/services/recommendations";
import Recommendation from "./Recommendation/Recommendation";
import { validationSchemaRecommendation } from "../../../schemas/validationSchemaRecommendation";
import AccessControl from "../../../permissionRoutes/AccessControl";
import { ERoles } from "../../../enums/ERoles";
import errorHandler  from "../../../helpers/errorHandler";
import successHandler from "../../../helpers/successHandler";

const DoctorRecommendations: FunctionComponent<IDoctorRecommendationsProps> = ({ doctorId, role }): ReactElement => {
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

    successHandler(isSuccessDeleteRecommendation, "Рекомендация удалена");
    successHandler(isSuccessCreateRecommendation, "Новая рекомендация создана");
    errorHandler(isErrorCreateRecommendation, errorCreateRecommendation);
    errorHandler(isErrorGetRecommendations, errorGetRecommendations);
    errorHandler(isErrorDeleteRecommendation, errorDeleteRecommendation);

    const [showList, setShowList] = useState(false);

    const handleShowList = () => {
        setShowList(!showList);
    };

    return (
        <div className={styles.recommendationBlock}>
            <AccessControl allowedRoles={[ERoles.DOCTOR]}>
                <Formik
                    initialValues={{
                        doctorId: doctorId || "",
                        text: ""
                    }}
                    onSubmit={async (values, {resetForm}) => {
                        await createRecommendation(values);
                        resetForm();
                    }}
                    validateOnBlur
                    validationSchema={validationSchemaRecommendation}
                >
                    {({ isValid, errors, touched, handleSubmit }) => (
                        <Form className={styles.recommendationForm}>
                            {touched.text && errors.text ? <p className={styles.errorText}>{errors.text}</p> : <p></p>}
                            <Field as={"textarea"} type="text" name="text" className={styles.textarea} placeholder={"Написать рекомендацию"} />
                            <div className={styles.publicationBtn}>
                                <Btn disabled={!isValid} size={EBtnSize.small} onclick={handleSubmit} types={EBtnTypes.submit} title="Опубликовать" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </AccessControl>
            <div className={styles.recommendationsBottom}>
                <p>{role === ERoles.DOCTOR ? "Мои рекомендации" : "Рекомендации доктора"}</p>
                <button
                    className={styles.recommendationBtn}
                    onClick={handleShowList}
                ><div className={`${showList ? styles.arrowUp : styles.arrowDown}`}></div></button>
            </div>
            {showList ? <div className={styles.recommendationsList}>
                {!recommendations?.length && <p className={styles.noRecommendations} >Рекомендации еще нет</p>}
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