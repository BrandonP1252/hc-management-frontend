import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthInfo } from './AuthInfo';

const ProtectedAdminRoute = () => {
    const role = AuthInfo();
    const admin = role === "[ROLE_ADMIN]" ? true : null;
    return admin ? <Outlet /> : <Navigate to="/" />;
}


export default ProtectedAdminRoute;
