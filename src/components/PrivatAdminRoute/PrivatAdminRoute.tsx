import React, { PropsWithChildren } from "react";
import { Navigate } from 'react-router-dom';

import { getDataFromStorage } from "helpers/sessionStorage";

export const PrivatAdminRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const token = getDataFromStorage('token');

    if (!token) {
        return <Navigate to="/admin/login" />
    }

    return <div>{children}</div>;
}
