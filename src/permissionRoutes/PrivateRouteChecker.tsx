import { Navigate, Route } from "react-router-dom";
import  PropTypes  from "prop-types";
import { useAppSelector } from "../app/hooks";
import { FunctionComponent, ReactNode } from "react";

interface PrivateRouteProps {
  pathTo: string;
  element: ReactNode;
}

const PrivateRouteChecker: FunctionComponent<PrivateRouteProps> = (props) => {
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