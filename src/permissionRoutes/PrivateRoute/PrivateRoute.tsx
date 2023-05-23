import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import IPrivateRoutProps from "./IPrivateRouteProps";

const PrivateRoute: React.FC<IPrivateRoutProps> = (props: IPrivateRoutProps) => {
    
    const { user } = useAppSelector(state => state.auth);

    return (
        user && props.allowedRoles.includes(user.role) ?
            <Outlet />
            :
            <Navigate to="/login" />
    );
};

export default PrivateRoute;