import React from "react";
import { Outlet, useLocation, Navigate } from 'react-router-dom';

import css from './adminPage.module.scss';

export const AdminPage: React.FC = () => {
    const { pathname } = useLocation();

    if (pathname === '/admin') {
        return <Navigate to='/admin/login' />
    }

    return <div className={css.root}>
        <div className={css.header}>

        </div>
        <div className={css.container}>
            <Outlet />
        </div>
    </div>;
}
