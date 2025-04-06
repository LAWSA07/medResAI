import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../../../services/supabase';
const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(session !== null);
        };
        checkAuth();
    }, []);
    // Show nothing while checking authentication
    if (isAuthenticated === null) {
        return null;
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login" });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
