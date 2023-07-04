import {FunctionComponent, ReactElement} from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import IDatePickerProps from "./IDatePickerProps";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../ChildAllergies/CreateAllergy/CreateAllergy.module.css";

export const DatePickerField: FunctionComponent<IDatePickerProps> = (props): ReactElement => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            className={styles.createEntityInput}
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

export default DatePickerField;