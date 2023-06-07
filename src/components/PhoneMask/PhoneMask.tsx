import { FunctionComponent, ReactElement, useState } from "react"
import styles from "../../containers/UserForms/UserForms.module.css";
import MaskedInput from "react-text-mask"
import { KGMask, KZMask, RUMask } from "../../helpers/countryRegexs";
import KZFlag from "../../assets/img/kz.png";
import KGFlag from "../../assets/img/kg.png";
import RUFlag from "../../assets/img/ru.png";
import IPhoneMaskProps from "./IPhoneMaskProps";

const PhoneMask: FunctionComponent<IPhoneMaskProps> = (props): ReactElement => {
    const [phoneMask, setPhoneMask] = useState(KZMask);
    const [placeholder, setPlaceholder] = useState("+7(___)___-__-__");
    const [flag, setFlag] = useState(KZFlag);

    const phoneMaskOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "RU":
                setPhoneMask(RUMask);
                setPlaceholder("+7(___)___-__-__");
                setFlag(RUFlag);
                break;
            case "KG":
                setPhoneMask(KGMask);
                setPlaceholder("+996(___)__-__-__");
                setFlag(KGFlag);
                break;
            case "KZ":
                setPhoneMask(KZMask);
                setPlaceholder("+7(___)___-__-__");
                setFlag(KZFlag);
                break;
            default:
                setPhoneMask(KZMask);
                break;
        }
    };
    return (
        <div className={styles.two_inputs_row}>
            <div className={styles.select_flag_wrapper}>
                <div className={styles.flag_wrapper}><img className={styles.flag_image} src={flag} alt="" /></div>
                <div className={styles.select_wrapper}>
                    <select className={styles.country_select} defaultValue={"KZ"} onChange={phoneMaskOnChange}>
                        <option value={"KZ"}>KZ</option>
                        <option value={"KG"}>KG</option>
                        <option value={"RU"}>RU</option>
                    </select>
                </div>
            </div>
            <props.field
                name="phone"
                type="text">
                {({ ...field }) => (
                    <MaskedInput
                        {...field}
                        mask={phoneMask}
                        id="phone"
                        placeholder={placeholder}
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        className={styles.LoginInput}
                    />
                )}
            </props.field>
        </div>
    )
}

export default PhoneMask