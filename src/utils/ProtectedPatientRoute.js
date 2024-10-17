import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthInfo from './AuthInfo'
import PatientNavBar from '../components/PatientNavBar';

const ProtectedPatientRoute = () => {
    const role = AuthInfo();
    const patient = (role === "[ROLE_ADMIN]" || role === "[ROLE_DOCTOR]" || role === "[ROLE_PATIENT]") ? true : null;
    if (patient === true) {
        return (
            <>
                <PatientNavBar />
                <Outlet />
            </>
        )
    }
    else {
        <Navigate to="/" />;
    }
    
}

export default ProtectedPatientRoute