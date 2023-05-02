import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import RegisterUser from "./containers/RegisterUser/RegisterUser";
import ResetPassword from "./containers/ResetPassword/ResetPassword";

const App: React.FunctionComponent = (): React.ReactElement => {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
};

export default App;
