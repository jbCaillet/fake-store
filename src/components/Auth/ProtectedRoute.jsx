import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { userLoged } = useContext(UserContext);

    if (!userLoged) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userLoged.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;