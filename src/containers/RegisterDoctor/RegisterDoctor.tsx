import React from "react";
import styles from "./RegisterDoctor.module.css";
import Register from "../../components/Register/Register";

const RegisterDoctor: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.RegisterDoctor}>
            <Register />
        </div>
    );
};

export default RegisterDoctor;