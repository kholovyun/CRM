import { FunctionComponent, ReactElement, useEffect } from "react";
import IAskQuestionFormProps from "./IAskQuestionFormProps";
import { useCreateQuestionMutation } from "../../app/services/questions";
import { errorHandler } from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import AccessControl from "../../permissionRoutes/AccessControl";
import { ERoles } from "../../enums/ERoles";
import { ErrorMessage, Field, Formik, Form } from "formik";
import styles from "./AskQuestionForm.module.css";
import { validationSchemaCreateQuestion } from "../../schemas/validationSchemaCreateQuestion";
import Btn from "../UI/Btn/Btn";
import { EBtnSize } from "../../enums/EBtnSize";
import { EBtnTypes } from "../../enums/EBtnTypes";
import { EBtnClass } from "../../enums/EBtnClass";

const AskQuestionForm: FunctionComponent<IAskQuestionFormProps> = (props): ReactElement => {
    const {childId, doctorId, parentId} = props;

    const [createQuestion, {isSuccess, isError, error}] = useCreateQuestionMutation();
    
    useEffect(() => {
        isError && errorHandler(error);
    }, [isError]);

    useEffect(() => {
        isSuccess && toast.info("Вопрос создан");
    }, [isSuccess]);
    
    return (
        <AccessControl allowedRoles={[ERoles.PARENT]}>
            <div className={styles.form_box}>
                <Formik
                    initialValues={{
                        question: "",
                        childId: childId,
                        doctorId: doctorId,
                        parentId: parentId,
                    }}
                    validateOnBlur
                    onSubmit={async (values, { resetForm }) => {
                        console.info(values);
                        
                        await createQuestion(values);
                        resetForm();
                    }}
                    validationSchema={validationSchemaCreateQuestion}
                >
                    {({  handleSubmit }) => (
                        <Form className={styles.form_column}>
                            <ErrorMessage className={styles.error_text} name="question" component="div" />
                            <Field as={"textarea"} type="text" name="question" className={styles.textarea}
                                placeholder={"Задать вопрос врачу..."} />
                            <div className={styles.btn_row}>
                                <Btn 
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

export default AskQuestionForm;