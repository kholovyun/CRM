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
import AdminPage from "./containers/AdminPage/AdminPage";
import { ERoles } from "./enums/ERoles";
import RegisterParent from "./containers/RegisterParrent/RegisterParent";
import PrivateRoute from "./permissionRoutes/PrivateRoute/PrivateRoute";

const App: React.FunctionComponent = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <ToastContainer theme="colored" autoClose={2000} />
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN]}/> }>
                        <Route path="/admin-page" element={<AdminPage />} />
                        <Route path="/register-user" element={<RegisterUser />} />                        
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR]}/> }>
                        <Route path="/register-parent" element={<RegisterParent />} />
                    </Route>                    
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/cabinet" element={<DoctorCabinet />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
