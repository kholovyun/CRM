import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "./RecommendationsBlock.module.css";
import IRecommendationsBlockProps from "./IRecommendationsBlockProps";
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
import Recommendation from "./ReccomendationsList/Recommendation/Recommendation";

const RecommendationsBlock: FunctionComponent<IRecommendationsBlockProps> = ({doctorData}): ReactElement => {
    const {
        data: recommendations, 
        isError: isErrorGetRecommendations, 
        error: errorGetRecommendations,
    } = useGetRecommendationsByDoctorQuery(doctorData?.id);

    // const {
    //     data: recommendations, 
    //     isError: isErrorGetRecommendations, 
    //     error: errorGetRecommendations,
    // } = useGetRecommendationsByDoctorQuery("a05d948b-177e-63e1-0a1c-4120de08ebe1");

    const [createRecommendation, {
        isSuccess: isSuccessCreateRecommendation, 
        isError: isErrorCreateRecommendation, 
        error: errorCreateRecommendation
    }] = useCreateRecommendationMutation();

    const [deleteRecommendation, {
        isSuccess: isSuccessDeleteRecommendation, 
        isError: isErrorDeleteRecommendation, 
        error: errorDeleteRecommendation,
        reset
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

    
    // useEffect(() => {
    //     if (isErrorDeleteRecommendation) {
    //         reset();
    //         errorHandler(errorDeleteRecommendation);
    //     }
    // }, [isErrorDeleteRecommendation]);

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

    return (
        <div className={styles.recommendationBlock}>
            <p className={styles.recommendationBlockTop}>Написать рекомендацию</p>
            <div className={styles.createRecommendationFormBox}>
                <Formik
                    initialValues={{
                        doctorId: doctorData?.id || "",
                        text: "" 
                    }}
                    onSubmit={(values) => {
                        
                        createRecommendation(values);
                    }}
                >
                    {({handleSubmit }) => (
                        <Form>
                            <Field as={"textarea"} type="text" name="text" className={styles.textarea}/>
                            <div className={styles.recommendationBlockBottom}>
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
                                    <Btn size={EBtnSize.small} onclick={handleSubmit} types={EBtnTypes.submit} title="Опубликовать" />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik> 
            </div>
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

export default RecommendationsBlock;