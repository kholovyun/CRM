import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import RegisterUser from "./containers/RegisterUser/RegisterUser";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Layout from "./components/Layout/Layout";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorCabinet } from "./containers/DoctorCabinet/DoctorCabinet";
import { Home } from "./containers/Home/Home";

const App: React.FunctionComponent = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <ToastContainer theme="colored" autoClose={2500} />
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/cabinet" element={<DoctorCabinet />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
