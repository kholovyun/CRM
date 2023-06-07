import React, { FC } from "react";
import { Container } from "../../../../components/UI/Container/Container";
import { Title } from "../../Title/Title";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import { EBtnClass } from "../../../../enums/EBtnClass";
import styles from "./NewBornDataForm.module.css";


export const NewBornDataForm: FC = (): React.ReactElement => {
    return (
        <Container>
            <Title text="Сведения о новорожденном" />
            <Formik
                initialValues={{
                    childId: "string",
                    dischargedDate: "",
                    pregnancyN: 0,
                    pregnancyDescript: "",
                    birthN: 0,
                    gestAge: 0,
                    period1: 0,
                    period2: 0,
                    amnAbsPeriod: 0,
                    amnDescript: "",
                    anesthesia: "",
                    postBirthPeriod: "",
                    motherState: "",
                    birthWeight: 0,
                    birthHeight: 0,
                    newbornState: "",
                    apgarScore: "",
                    reanimation: "",
                    breastTry: true,
                    feeding: "",
                    diagnosis: "",
                    examination: "",
                    treatment: "",
                    eyes: "",
                    reflexes: "",
                    skin: "",
                    organs: "",
                    stool: "",
                    diuresis: "",
                    umbilicalCord: "",
                    examed_by: "",
                    notes :"",
                    feedingReason: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    toast.info("Данные корректны");
                }}
            >
                {({ isValid, errors, touched, handleSubmit}) => (
                    <Form className={styles.form_container}>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.input_near_text}>Родился</p>
                                <Field className={styles.born_data_input} name="name" type="date"/>
                            </label>
                            <label className={styles.label_flex}>
                                <p className={styles.input_near_text}>Выписан</p>
                                <Field className={styles.born_data_input} name="dischargedDate" type="date"/>
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Ребенок от</p>
                                <Field className={styles.number_select} as="select" id="number" name="pregnancyN">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </Field>
                                <p  className={styles.input_near_text}>беременности</p>
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Протекающей</p>
                                <Field className={styles.born_data_input} name="pregnancyDescript" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block_short}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text} >Роды</p>
                                <Field className={styles.number_select} as="select" id="number" name="birthN">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </Field>
                            </label>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>в сроки</p>
                                <Field className={styles.born_data_input} name="gestAge" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>1 период</p>
                                <Field className={styles.born_data_input} name="period1" type="text" />
                                <p className={styles.near_input_text}>2 период</p>
                                <Field className={styles.born_data_input} name="period2" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Безводный период</p>
                                <Field  className={styles.born_data_input} name="amnAbsPeriod" type="text" />
                            </label>
                        </div>
                        <div className={styles.date_block}>
                            <label className={styles.label_flex}>
                                <p className={styles.near_input_text}>Характер околоплодных вод</p>
                                <Field  className={styles.born_data_input} name="amnDescript" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Обезболивание применялось, нет, какое</p>
                                <Field  className={styles.born_data_input} name="anesthesia" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Течение послеродового периода</p>
                                <Field  className={styles.born_data_input} name="postBirthPeriod" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Состояние матери при выписке</p>
                                <Field className={styles.born_data_input}  name="motherState" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Пол ребенка</p>
                                <label>
                                    <Field type="radio" name="picked" value="One" />
                                        М
                                </label>
                                <label>
                                    <Field type="radio" name="picked" value="Two" />
                                        Ж
                                </label>
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Масса при рождении</p>
                                <Field className={styles.born_data_input} name="birthWeight" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Рост при рождении</p>
                                <Field className={styles.born_data_input} name="birthHeight" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Состояние ребенка при рождении</p>
                                <Field className={styles.born_data_input} name="newbornState" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Оценка по шкале Апгар</p>
                                <Field className={styles.born_data_input} name="apgarScore" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Проводились ли меры по оживлению</p>
                                <Field className={styles.born_data_input} name="reanimation" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <label id="yes">
                                    <Field  type="radio" name="breastTry" value="true" />
                                    <Field  type="checkbox"/>
                                        К груди приложен
                                </label>
                                <label id="no">
                                    <Field type="radio" name="breastTry" value="false" />
                                    <Field type="checkbox"/>
                                        К груди не приложен
                                </label>
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Причина вскармиливания</p>
                                <Field className={styles.born_data_input} name="feeding" type="text" />   
                            </label>
                            <label>
                                <Field type="radio" name="feeding" value="грудное" />
                                    исключительно грудное
                            </label>
                            <label>
                                <Field type="radio" name="feeding" value="смешанное" />
                                    смешанное
                            </label>
                            <label>
                                <Field type="radio" name="feeding" value="искусственное" />
                                    искусственное
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Диагноз</p>
                                <Field className={styles.born_data_input}  name="diagnosis" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Обследован</p>
                                <Field className={styles.born_data_input}  name="examination" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Лечение</p>
                                <Field className={styles.born_data_input} name="treatment" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>При выписке состояние: глаза</p>
                                <Field className={styles.born_data_input} name="eyes" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>физиологические рефлексы</p>
                                <Field className={styles.born_data_input} name="reflexes" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>При выписке состояние: глаза</p>
                                <Field className={styles.born_data_input} name="skin" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>физиологические рефлексы</p>
                                <Field className={styles.born_data_input}  name="organs" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>При выписке состояние: глаза</p>
                                <Field className={styles.born_data_input} name="stool" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>физиологические рефлексы</p>
                                <Field className={styles.born_data_input} name="diuresis" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>При выписке состояние: глаза</p>
                                <Field className={styles.born_data_input} name="umbilicalCord" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>физиологические рефлексы</p>
                                <Field className={styles.born_data_input} name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Особые заменчания</p>
                                <Field className={styles.born_data_input} name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p  className={styles.input_near_text}>Заключение составил</p>
                                <Field className={styles.born_data_input}  name="name" type="text" />
                            </label>
                        </div>
                        {touched.pregnancyDescript && errors.pregnancyDescript ? <p>{errors.pregnancyDescript}</p> : <p></p>}
                        <Btn disabled={!isValid} title="Создать" onclick={handleSubmit} size={EBtnSize.big} types={EBtnTypes.submit} btnClass={EBtnClass.dark_active} />
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
