import React from "react";
import RegisterUser from "./RegisterUser";
import { ERoles } from "../../../enums/ERoles";

const RegisterDoctor: React.FunctionComponent = (): React.ReactElement => {
    return (
        <RegisterUser role={ERoles.DOCTOR} title={"Регистрация врача"} />
    );
};

export default RegisterDoctor;