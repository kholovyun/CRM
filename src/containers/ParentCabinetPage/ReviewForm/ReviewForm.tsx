import { FunctionComponent, ReactElement, useEffect } from "react";
import styles from "./ReviewForm.module.css";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { ERoles } from "../../../enums/ERoles";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IErrorResponse } from "../../../interfaces/IUser/IErrorResponse";
import { IMessage } from "../../../interfaces/IUser/IMessage";
import { toast } from "react-toastify";
import { validationSchemaCreateReview } from "../../../schemas/validationSchemaCreateReview";
import { EBtnTypes } from "../../../enums/EBtnTypes";
import { EBtnClass } from "../../../enums/EBtnClass";
import { useCreateReviewMutation } from "../../../app/services/reviews";
import AccessControl from "../../../permissionRoutes/AccessControl";
import IReviewFormProps from "./IReviewFormProps";

export const ReviewForm: FunctionComponent<IReviewFormProps> = (props: IReviewFormProps): ReactElement => {

    const [createReview,
        { isError: isCreateReviewError,
            isSuccess: isSuccesCreateReview,
            error: errorCreateReview,
            reset: resetCreateReview }
    ] = useCreateReviewMutation();

    const errorHandler = (data: FetchBaseQueryError | SerializedError | undefined) => {
        const err = data as IErrorResponse<IMessage>;
        toast.error(`Ошибка ${err.data.message}`);
    };

    useEffect(() => {
        isCreateReviewError && errorHandler(errorCreateReview);
    }, [isCreateReviewError]);

    useEffect(() => {
        isSuccesCreateReview && toast.info("Ваш отзыв отправлен") && resetCreateReview();
    }, [isSuccesCreateReview]);

    return (
        <AccessControl allowedRoles={[ERoles.PARENT]}>
            <div className={styles.review_form_box}>
                <Formik
                    initialValues={{
                        userId: props.userId,
                        text: ""
                    }}
                    validateOnBlur
                    onSubmit={async (values, { resetForm }) => {
                        await createReview({ review: values });
                        resetForm();
                    }}
                    validationSchema={validationSchemaCreateReview}
                >
                    {({ isValid, handleSubmit }) => (
                        <Form className={styles.form_column}>
                            <ErrorMessage className={styles.error_text} name="text" component="div" />
                            <Field as={"textarea"} type="text" name="text" className={styles.textarea}
                                placeholder={"Поделитесь впечатлениями или пожеланиями по работе сервиса..."} />
                            <div className={styles.btn_row}>
                                <Btn disabled={!isValid}
                                    title="Отправить"
                                    onclick={handleSubmit}
                                    size={EBtnSize.tiny}
                                    types={EBtnTypes.submit}
                                    btnClass={EBtnClass.dark_active} />
                            </div>
                        </Form>
                    )}
                </Formik >
            </div>
        </AccessControl>
    );
};

export default ReviewForm;