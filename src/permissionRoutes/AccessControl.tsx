import React from "react";
import { useAppSelector } from "../app/hooks";

interface AccessControlProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const AccessControl: React.FC<AccessControlProps> = ({
    allowedRoles,
    children
}) => {
    const { user } = useAppSelector(state => state.auth);

    if (!user || (user && !allowedRoles.includes(user.role))) {
        return null;
    }

    return <>{children}</>;
};

export default AccessControl;