import React from "react";
import { useAppSelector } from "../app/hooks";

interface AccessControlProps {
  allowedRoles: string[];
  component: React.ComponentType;
}

const AccessControl: React.FC<AccessControlProps> = ({
    allowedRoles,
    component: Component,
    
}) => {
    const { user } = useAppSelector(state => state.auth);

    if (!user || user && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <Component />;
};

export default AccessControl;
