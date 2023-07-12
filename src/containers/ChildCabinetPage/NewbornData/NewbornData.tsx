import { FunctionComponent, ReactElement } from "react";
import INewbornDataProps from "./INewbornDataProps";
import { FormBox } from "../../UserForms/FormBox/FormBox";
import { Field, Form, Formik } from "formik";
import { useGetNewbornDatasByChildIdQuery, useUpdateNewbornDataMutation } from "../../../app/services/newbornDatas";
import errorHandler from "../../../helpers/errorHandler";
import { validationSchemaEditNewbornData } from "../../../schemas/validationSchemaEditNewbornData";
import successHandler from "../../../helpers/successHandler";
import styles from "./NewbornData.module.css";
import Btn from "../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../enums/EBtnSize";
import { EBtnTypes } from "../../../enums/EBtnTypes";

const NewbornData: FunctionComponent<INewbornDataProps> = (props): ReactElement => {
    const {
        data: newbornData,
        isError: isErrorGetNewbornDatas,
        error: errorGetNewbornDatas,
    } = useGetNewbornDatasByChildIdQuery(props.childId);

    const [updateNewbornData, {
        isError: isErrorUpdateNewbornData,
        isSuccess: isSuccesUpdateNewbornData,
        error: errorUpdateNewbornData
    }] = useUpdateNewbornDataMutation();

    successHandler(isSuccesUpdateNewbornData, "Сведение о новорожденном изменено");
    errorHandler(isErrorGetNewbornDatas, errorGetNewbornDatas);
    errorHandler(isErrorUpdateNewbornData, errorUpdateNewbornData);

    return (
        <div>
            {newbornData &&
                <FormBox>
                    <Formik
                        initialValues={{
                            childId: props.childId,
                            dischargedDate: newbornData[0].dischargedDate,
                            pregnancyN: newbornData[0].pregnancyN,
                            pregnancyDescript: newbornData[0].pregnancyDescript,
                            birthN: newbornData[0].birthN,
                            gestAge: newbornData[0].gestAge,
                            period1: newbornData[0].period1,
                            period2: newbornData[0].period2,
                            amnAbsPeriod: newbornData[0].amnAbsPeriod,
                            amnDescript: newbornData[0].amnDescript,
                            anesthesia: newbornData[0].anesthesia,
                            postBirthPeriod: newbornData[0].postBirthPeriod,
                            motherState: newbornData[0].motherState,
                            birthWeight: newbornData[0].birthWeight,
                            birthHeight: newbornData[0].birthHeight,
                            newbornState: newbornData[0].newbornState,
                            apgarScore: newbornData[0].apgarScore,
                            reanimation: newbornData[0].reanimation,
                            breastTry: newbornData[0].breastTry,
                            feeding: newbornData[0].feeding,
                            diagnosis: newbornData[0].diagnosis,
                            examination: newbornData[0].examination,
                            treatment: newbornData[0].treatment,
                            eyes: newbornData[0].eyes,
                            reflexes: newbornData[0].reflexes,
                            skin: newbornData[0].skin,
                            organs: newbornData[0].organs,
                            stool: newbornData[0].stool,
                            diuresis: newbornData[0].diuresis,
                            umbilicalCord: newbornData[0].umbilicalCord,
                            examedBy: newbornData[0].examedBy,
                            notes: newbornData[0].notes,
                            feedingReason: newbornData[0].feedingReason
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            updateNewbornData({ id: props.childId, newbornData: values });
                        }}
                        validationSchema={validationSchemaEditNewbornData}
                    >
                        {({ isValid, errors, touched, handleSubmit }) => (
                            <Form>
                                <div className={styles.editUserField}>
                                    {touched.feeding && errors.feeding ? <p>{errors.feeding}</p> : <p></p>}
                                    <p className={styles.editUserFieldTitle}>Отчество</p>
                                    <Field className={styles.editUserInput} name="feeding" type="text" />
                                </div>
                                <div className={styles.saveButton}>
                                    <Btn disabled={!isValid} title="Сохранить" onclick={handleSubmit} size={EBtnSize.tiny} types={EBtnTypes.submit} />
                                </div>
                            </Form>
                        )}

                    </Formik>
                </FormBox>}

        </div>
    );
};

export default NewbornData;

