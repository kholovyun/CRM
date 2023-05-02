import React from "react";
import styles from "./RegisterUser.module.css";
import Register from "../../components/Register/Register";

const RegisterUser: React.FunctionComponent = (): React.ReactElement => {
    return (
        <div className={styles.RegisterUser}>
            <Register />
        </div>
    );
};

export default RegisterUser;