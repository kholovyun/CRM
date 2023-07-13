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
import DatePickerField from "../../../components/UI/DatePicker/DatePicker";
import { ESex } from "../../../enums/ESex";

const NewbornData: FunctionComponent<INewbornDataProps> = (props): ReactElement => {
    const {
        data: newbornData,
        isError: isErrorGetNewbornDatas,
        error: errorGetNewbornDatas,
    } = useGetNewbornDatasByChildIdQuery(props.child.id);

    const [updateNewbornData, {
        isError: isErrorUpdateNewbornData,
        isSuccess: isSuccesUpdateNewbornData,
        error: errorUpdateNewbornData
    }] = useUpdateNewbornDataMutation();

    successHandler(isSuccesUpdateNewbornData, "Сведение о новорожденном изменено");
    errorHandler(isErrorGetNewbornDatas, errorGetNewbornDatas);
    errorHandler(isErrorUpdateNewbornData, errorUpdateNewbornData);
    const pregnancyNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div>
            {newbornData &&
                <FormBox>
                    <Formik
                        initialValues={{
                            childId: props.child.id,
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
                            updateNewbornData({ id: props.child.id, newbornData: values });
                        }}
                        validationSchema={validationSchemaEditNewbornData}
                    >
                        {({ isValid, errors, touched, handleSubmit }) => (
                            <Form>
                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        <p className={styles.createEntityFieldTitle}>Родился</p>
                                        <span>{new Date(props.child.dateOfBirth).toLocaleDateString()}</span>
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.dischargedDate && errors.dischargedDate ? <p>{ }</p> : <p></p>}
                                        <p className={styles.createEntityFieldTitle}>Выписан</p>
                                        <DatePickerField name="dischargedDate" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.pregnancyN && errors.pregnancyN ? <p>{errors.pregnancyN}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Ребенок от</span>
                                        <Field id="pregnancyN" as="select" className={styles.createEntityInput} name="pregnancyN">
                                            {pregnancyNumber.map(num => {
                                                return <option key={num} value={num}>{num}</option>;
                                            })}
                                        </Field>
                                        <span>беременности</span>
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.pregnancyDescript && errors.pregnancyDescript ? <p>{errors.pregnancyDescript}</p> : <p></p>}
                                        <p className={styles.createEntityFieldTitle}>Протекающей</p>
                                        <Field as="textarea" className={styles.createEntityInput} name="pregnancyDescript" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.birthN && errors.birthN ? <p>{errors.birthN}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Роды</span>
                                        <Field id="birthN" as="select" className={styles.createEntityInput} name="birthN">
                                            {pregnancyNumber.map(num => {
                                                return <option key={num} value={num}>{num}</option>;
                                            })}
                                        </Field>
                                    </div>
                                </div>
                                
                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.gestAge && errors.gestAge ? <p>{errors.gestAge}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>в сроки</span>
                                        <Field className={styles.createEntityInput} name="gestAge" type="number" />
                                        <span className={styles.createEntityFieldTitle}>неделя</span>
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.period1 && errors.period1 ? <p>{errors.period1}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>1 период</span>
                                        <Field className={styles.createEntityInput} name="period1" type="number" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.period2 && errors.period2 ? <p>{errors.period2}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>2 период</span>
                                        <Field className={styles.createEntityInput} name="period2" type="numbre" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.amnAbsPeriod && errors.amnAbsPeriod ? <p>{errors.amnAbsPeriod}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Безводный период</span>
                                        <Field className={styles.createEntityInput} name="amnAbsPeriod" type="number" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.amnDescript && errors.amnDescript ? <p>{errors.amnDescript}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Характер околоплодных вод</span>
                                        <Field className={styles.createEntityInput} name="amnDescript" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.anesthesia && errors.anesthesia ? <p>{errors.anesthesia}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Обезболивание применялось, нет, какое</span>
                                        <Field className={styles.createEntityInput} name="anesthesia" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.postBirthPeriod && errors.postBirthPeriod ? <p>{errors.postBirthPeriod}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Течение послеродового периода</span>
                                        <Field className={styles.createEntityInput} name="postBirthPeriod" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.motherState && errors.motherState ? <p>{errors.motherState}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Состояние матери при выписке</span>
                                        <Field as="textarea" className={styles.createEntityInput} name="motherState" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        <span className={styles.createEntityFieldTitle}>Пол ребенка</span>
                                        <label>
                                            <Field checked={props.child.sex === ESex.FEMALE} type="radio" name="sex" value={ESex.FEMALE} className={styles.createEntityInput} /> женский
                                        </label>
                                        <label>
                                            <Field checked={props.child.sex === ESex.MALE} type="radio" name="sex" value={ESex.MALE} className={styles.createEntityInput} /> мужской
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.birthWeight && errors.birthWeight ? <p>{errors.birthWeight}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Масса при рождении</span>
                                        <Field className={styles.createEntityInput} name="birthWeight" type="number" />
                                        <span className={styles.createEntityFieldTitle}>кг</span>
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.birthHeight && errors.birthHeight ? <p>{errors.birthHeight}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Рост при рождении</span>
                                        <Field className={styles.createEntityInput} name="birthHeight" type="number" />
                                        <span className={styles.createEntityFieldTitle}>см</span>
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.newbornState && errors.newbornState ? <p>{errors.newbornState}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Состояние ребенка при рождении</span>
                                        <Field className={styles.createEntityInput} name="newbornState" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.apgarScore && errors.apgarScore ? <p>{errors.apgarScore}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Оценка по шкале Апгар</span>
                                        <Field className={styles.createEntityInput} name="apgarScore" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.reanimation && errors.reanimation ? <p>{errors.reanimation}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Проводились ли меры по оживлению</span>
                                        <Field className={styles.createEntityInput} name="reanimation" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.breastTry && errors.breastTry ? <p>{errors.breastTry}</p> : <p></p>}
                                        <label>К груди приложен
                                            <Field type="checkbox" name="breastTry" className={styles.createEntityInput} />
                                        </label>
                                        <label> К груди не приложен
                                            <Field type="checkbox" name="breastTry" className={styles.createEntityInput} />
                                        </label>
                                        
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.feeding && errors.feeding ? <p>{errors.feeding}</p> : <p></p>}
                                        {touched.feedingReason && errors.feedingReason ? <p>{errors.feedingReason}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Причина вскармиливания</span>
                                        <Field className={styles.createEntityInput} name="feedingReason" type="text" />
                                        <label>
                                            <Field type="radio" name="feeding" value={"исключительно грудное"} className={styles.createEntityInput} /> исключительно грудное
                                        </label>
                                        <label>
                                            <Field type="radio" name="feeding" value={"смешанное"} className={styles.createEntityInput} /> смешанное
                                        </label>
                                        <label>
                                            <Field type="radio" name="feeding" value={"искусственное"} className={styles.createEntityInput} /> искусственное
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.diagnosis && errors.diagnosis ? <p>{errors.diagnosis}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Диагноз</span>
                                        <Field as="textarea" className={styles.createEntityInput} name="diagnosis" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.examination && errors.examination ? <p>{errors.examination}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Обследован</span>
                                        <Field as="textarea" className={styles.createEntityInput} name="examination" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.treatment && errors.treatment ? <p>{errors.treatment}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Лечение</span>
                                        <Field as="textarea" className={styles.createEntityInput} name="treatment" type="text" />
                                    </div>
                                </div>

                                <div>
                                    <p>При выписке состояние: </p>
                                    <div className={styles.createEntityField}>
                                        {touched.eyes && errors.eyes ? <p>{errors.eyes}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>глаза</span>
                                        <Field className={styles.createEntityInput} name="eyes" type="text" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.reflexes && errors.reflexes ? <p>{errors.reflexes}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>физиологические рефлексы</span>
                                        <Field className={styles.createEntityInput} name="reflexes" type="text" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.skin && errors.skin ? <p>{errors.skin}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>цвет кожи</span>
                                        <Field className={styles.createEntityInput} name="skin" type="text" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.organs && errors.organs ? <p>{errors.organs}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>по органам</span>
                                        <Field className={styles.createEntityInput} name="organs" type="text" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.stool && errors.stool ? <p>{errors.stool}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>стул</span>
                                        <Field className={styles.createEntityInput} name="stool" type="text" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.diuresis && errors.diuresis ? <p>{errors.diuresis}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>диурез</span>
                                        <Field className={styles.createEntityInput} name="diuresis" type="text" />
                                    </div>
                                    <div className={styles.createEntityField}>
                                        {touched.umbilicalCord && errors.umbilicalCord ? <p>{errors.umbilicalCord}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>пуповинный остаток</span>
                                        <Field className={styles.createEntityInput} name="umbilicalCord" type="text" />
                                    </div>
                                </div>
                                
                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.notes && errors.notes ? <p>{errors.notes}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Особые замечания</span>
                                        <Field as="textarea" className={styles.createEntityInput} name="notes" type="text" />
                                    </div>
                                </div>

                                <div className={styles.createEntityLine}>
                                    <div className={styles.createEntityField}>
                                        {touched.examedBy && errors.examedBy ? <p>{errors.examedBy}</p> : <p></p>}
                                        <span className={styles.createEntityFieldTitle}>Заключение составил</span>
                                        <Field className={styles.createEntityInput} name="examedBy" type="text" />
                                    </div>
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

