import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../admin/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user?.user);
    const loading = useSelector((state) => state.user?.loading);

    // Show loading spinner while checking authentication
    if (loading) {
        return <LoadingSpinner fullScreen text="Loading..." />;
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
