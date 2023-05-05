import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import RegisterUser from "./containers/RegisterUser/RegisterUser";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Layout from "./components/Register/Layout/Layout";

const App: React.FunctionComponent = (): React.ReactElement => {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/register-user" element={<RegisterUser />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
        </Routes>
    );
};

export default App;
