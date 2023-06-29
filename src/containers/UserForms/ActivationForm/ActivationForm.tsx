import {Field, Form, Formik} from "formik";
import styles from "./ActivationForm.module.css";
import {validationSchemaActivateParent} from "../../../schemas/validationSchemaActivateParent.ts";
import Btn from "../../../components/UI/Btn/Btn.tsx";
import {EBtnTypes} from "../../../enums/EBtnTypes.ts";
import {EBtnSize} from "../../../enums/EBtnSize.ts";

type TActivationProps = {
    fn: () => void;
};
const ActivationForm = (props: TActivationProps) => {
    return (
        <Formik
            initialValues={{
                offerChecked: false,
                privacyChecked: false,
                childInfoChecked: false
            }}
            validationSchema={validationSchemaActivateParent}
            onSubmit={() => {
                props.fn();
            }}
        >
            {({ values }) => (
                <Form className={styles.activationForm}>
                    <p className={styles.activationFormTitle}>
                        Активация вашего аккаунта произойдет после того, как вы ознакомитесь с договором оферты, политикой конфиденциальности и сведениями, внесенными в личный кабинет
                    </p>
                    <div className={styles.activationFormCheckBoxes}>
                        <label className={styles.activationFormControls}>
                            С договором оферты ознакомлен и согласен
                            <Field type="checkbox" name="offerChecked" />
                        </label>
                        <label className={styles.activationFormControls}>
                            С политикой конфиденциальности ознакомлен и согласен
                            <Field type="checkbox" name="privacyChecked" />
                        </label>
                        <label className={styles.activationFormControls}>
                            Сведения о ребенке внесены корректно
                            <Field type="checkbox" name="childInfoChecked" />
                        </label>
                    </div>
                    <Btn
                        title={"Сохранить"}
                        types={EBtnTypes.submit}
                        size={EBtnSize.big}
                        disabled={!values.offerChecked || !values.privacyChecked || !values.childInfoChecked}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default ActivationForm;