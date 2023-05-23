import { Navigate, Route } from "react-router-dom";
import  PropTypes  from "prop-types";
import { useAppSelector } from "../app/hooks";

interface PrivateRouteProps {
  pathTo: string;
  element: React.ReactNode;
}

const PrivateRouteChecker: React.FC<PrivateRouteProps> = (props) => {
    const { user } = useAppSelector(state => state.auth);

    return user ? (
        <Route path={props.pathTo} element={props.element} />
    ) : (
        <Navigate to="/login" />
    );
};

PrivateRouteChecker.propTypes = {
    pathTo: PropTypes.string.isRequired,
    element: PropTypes.node.isRequired,
};


export default PrivateRouteChecker;