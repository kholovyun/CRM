import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./containers/UserForms/Login/Login";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./containers/Home/Home";
import AdminPage from "./containers/AdminPage/AdminPage";
import { ERoles } from "./enums/ERoles";
import PrivateRoute from "./permissionRoutes/PrivateRoute/PrivateRoute";
import AllDoctors from "./containers/AdminPage/AdminTables/AllDoctors/AllDoctors";
import DoctorCabinetPage from "./containers/DoctorCabinetPage/DoctorCabinetPage";
import RegisterDoctor from "./containers/UserForms/RegisterUser/RegisterDoctor";
import RegisterAdmin from "./containers/UserForms/RegisterUser/RegisterAdmin";
import RegisterParent from "./containers/UserForms/RegisterParrent/RegisterParent";
import ResetPassword from "./containers/UserForms/ResetPassword/ResetPassword";
import ForgotPassword from "./containers/UserForms/ForgotPassword/ForgotPassword";

const App: React.FunctionComponent = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <ToastContainer theme="colored" autoClose={2000} />
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN]}/> }>
                        <Route path="/admin-page" element={<AdminPage />}>
                            <Route path="/admin-page/doctors" element={<AllDoctors />}/>
                            <Route path="/admin-page/register-doctor" element={<RegisterDoctor />} />
                            <Route path="/admin-page/register-admin" element={<RegisterAdmin />} />
                        </Route>                                         
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR]}/> }>
                        <Route path="/register-parent" element={<RegisterParent />} />
                    </Route>                    
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/cabinet" element={<DoctorCabinetPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};


export default App;
