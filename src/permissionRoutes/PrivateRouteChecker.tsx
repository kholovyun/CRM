import { Navigate, Route } from "react-router-dom";
import  PropTypes  from "prop-types";
import { useAppSelector } from "../app/hooks";

interface PrivateRouteProps {
  pathTo: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const { user } = useAppSelector(state => state.auth);
    
    return user ? (
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