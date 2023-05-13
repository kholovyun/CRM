import { Navigate, Route } from "react-router-dom";
import  PropTypes  from "prop-types";

interface PrivateRouteProps {
  pathTo: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const isAuth = "Проверка на аутентификацию, как то нужно достать из ртк квери";

    return isAuth ? (
        <Route path={props.pathTo} element={props.element} />
    ) : (
        <Navigate to="/login" />
    );
};

PrivateRoute.propTypes = {
    pathTo: PropTypes.string.isRequired,
    element: PropTypes.node.isRequired,
};


export default PrivateRoute;