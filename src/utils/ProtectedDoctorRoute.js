import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthInfo from './AuthInfo'

const ProtectedDoctorRoute = () => {
    const role = AuthInfo();
    const doctor = (role === "[ROLE_ADMIN]" || role === "[ROLE_DOCTOR]") ? true : null;
    return doctor ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedDoctorRoute