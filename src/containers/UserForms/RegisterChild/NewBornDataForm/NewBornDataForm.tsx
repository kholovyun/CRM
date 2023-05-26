import React, { FC } from "react";
import { Container } from "../../../../components/UI/Container/Container";
import { Title } from "../../Title/Title";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import Btn from "../../../../components/UI/Btn/Btn";
import { EBtnSize } from "../../../../enums/EBtnSize";
import { EBtnTypes } from "../../../../enums/EBtnTypes";
import { EBtnClass } from "../../../../enums/EBtnClass";
import MaskedInput from "react-text-mask";
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
                {({ isValid, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <Form>
                        <div className={styles.date_block}>
                            <label className={styles.date_block}>
                                <p>Родился</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field name="name" type="text" 
                                    render={({ ...field }) => (
                                        <MaskedInput
                                            className={styles.date_input}
                                            {...field}
                                            mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
                                            id="phone"
                                            placeholder="_ _  .  _ _  .  _ _ _ _"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    )}
                                />
                            </label>
                            <label className={styles.date_block}>
                                <p>Выписан</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field name="name" type="text" 
                                    render={({ ...field }) => (
                                        <MaskedInput
                                            className={styles.date_input}
                                            {...field}
                                            mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
                                            id="phone"
                                            placeholder="_ _  .  _ _  .  _ _ _ _"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    )}
                                />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Ребенок от</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field as="select" id="number" name="number">
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
                                <p>беременности</p>
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Протекающей</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Роды</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field as="select" id="number" name="number">
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
                            <label style={{"display": "flex"}}>
                                <p>в сроки</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>1 период, 2 период</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Безводный период</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Характер околоплодных вод</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Обезболивание применялось, нет, какое</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Течение послеродового периода</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Состояние матери при выписке</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Пол ребенка</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
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
                                <p>Масса при рождении</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Рост при рождении</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Состояние ребенка при рождении</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Оценка по шкале Апгар</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Проводились ли меры по оживлению</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <label id="yes">
                                    <Field  type="radio" name="bf" value="true" />
                                    <Field  type="checkbox"/>
                                        К груди приложен
                                </label>
                                <label id="no">
                                    <Field type="radio" name="bf" value="false" />
                                    <Field type="checkbox"/>
                                        К груди не приложен
                                </label>
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Причина вскармиливания</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />   
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="One" />
                                    исключительно грудное
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="Two" />
                                    смешанное
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="three" />
                                    искусственное
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Диагноз</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Обследован</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Лечение</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>При выписке состояние: глаза</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p>физиологические рефлексы</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>При выписке состояние: глаза</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p>физиологические рефлексы</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>При выписке состояние: глаза</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p>физиологические рефлексы</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>При выписке состояние: глаза</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                            <label style={{"display": "flex"}}>
                                <p>физиологические рефлексы</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Особые заменчания</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
                            </label>
                        </div>
                        <div style={{"display": "flex"}}>
                            <label style={{"display": "flex"}}>
                                <p>Заключение составил</p>
                                {touched.dischargedDate && errors.dischargedDate ? <p >{errors.dischargedDate}</p> : <p ></p>}
                                <Field  name="name" type="text" />
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
