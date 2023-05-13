import React from "react";

interface AccessControlProps {
  allowedRoles: string[];
  component: React.ComponentType;
}

const AccessControl: React.FC<AccessControlProps> = ({
    allowedRoles,
    component: Component,
}) => {
    const role = "Some role"; // Получить роль позьзователя через РТК Квери

    if (!allowedRoles.includes(role)) {
        return null;
    }

    return <Component />;
};

export default AccessControl;
