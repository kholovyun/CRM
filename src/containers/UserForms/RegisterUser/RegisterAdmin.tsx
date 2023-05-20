import React from "react";
import RegisterUser from "./RegisterUser";
import { ERoles } from "../../../enums/ERoles";

const RegisterAdmin: React.FunctionComponent = (): React.ReactElement => {
    return (
        <RegisterUser role={ERoles.ADMIN} title={"Регистрация администратора"}/>
    );
};

export default RegisterAdmin;