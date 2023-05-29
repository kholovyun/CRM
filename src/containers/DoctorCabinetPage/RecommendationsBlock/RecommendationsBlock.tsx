import { FunctionComponent, ReactElement } from "react";
import styles from "./RecommendationsBlock.module.css";
import IReccomendationsBlockProps from "./IRecommendationsBlockProps";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { useCreateRecommendationMutation, useGetRecommendationsByDoctorQuery } from "../../../app/services/recommendations";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";

const RecommendationsBlock: FunctionComponent<IReccomendationsBlockProps> = ({doctorData}): ReactElement => {
    

    const {data: reccomendations} = useGetRecommendationsByDoctorQuery(doctorData.id);

    const [createRecommendation, {
        isSuccess: isSuccessCreateRecommendation, 
        isError: isErrorCreateRecommendation, 
        error: errorCreateRecommendation,
        reset: resetCreateRecommendation
    }] = useCreateRecommendationMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message} Статус: ${err.status}`);
    };

    if (isSuccessCreateRecommendation) {
        resetCreateRecommendation();
        toast.info("Новая рекомендация создана");
    }

    isErrorCreateRecommendation && errorHandler(errorCreateRecommendation);

    return (
        <div className={styles.reccomendationBlock}>
            <p className={styles.reccomendationBlockTop}>Написать рекомендацию</p>
            <div className={styles.createRecommendationBox}>
                <Formik
                    initialValues={{
                        doctorId: doctorData?.id || "",
                        text: "" 
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        createRecommendation(values);
                    }}
                >
                    {({handleSubmit }) => (
                        <Form>
                            <Field as={"textarea"} type="text" name="text" className={styles.textarea}/>
                            <div className={styles.reccomendationBlockBottom}>
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

        </div>
    );
};

export default RecommendationsBlock;