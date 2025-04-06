import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from 'react';
import supabase from '../services/supabase';
import AuthService from '../services/auth.service';
const AuthContext = createContext(null);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await AuthService.getCurrentUser();
                setUser(currentUser);
                setIsAuthenticated(Boolean(currentUser));
            }
            catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
                setIsAuthenticated(false);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchUser();
        // Set up auth listener
        const { data: { subscription }, } = supabase.auth.onAuthStateChange(async (event, _session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                fetchUser();
            }
            else if (event === 'SIGNED_OUT') {
                setUser(null);
                setIsAuthenticated(false);
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            await AuthService.login({ email, password });
            const user = await AuthService.getCurrentUser();
            setUser(user);
            setIsAuthenticated(Boolean(user));
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = async () => {
        setIsLoading(true);
        try {
            await AuthService.logout();
            setUser(null);
            setIsAuthenticated(false);
        }
        finally {
            setIsLoading(false);
        }
    };
    const signup = async (email, password) => {
        await AuthService.signup({ email, password });
    };
    const updateProfile = async (profileData) => {
        setIsLoading(true);
        try {
            await AuthService.updateProfile(profileData);
            const updatedUser = await AuthService.getCurrentUser();
            setUser(updatedUser);
        }
        finally {
            setIsLoading(false);
        }
    };
    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        signup,
        updateProfile,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
export default AuthContext;
