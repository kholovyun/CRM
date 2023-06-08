import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import IPrivateRoutProps from "./IPrivateRouteProps";
import { FunctionComponent, ReactElement } from "react";

const PrivateRoute: FunctionComponent<IPrivateRoutProps> = (props: IPrivateRoutProps): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    return (
        user && props.allowedRoles.includes(user.role) ?
            <Outlet />
            :
            <Navigate to="/login" />
    );
};

export default PrivateRoute;