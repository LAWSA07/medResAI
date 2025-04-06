import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import OnboardingModal from './OnboardingModal';
const ProfileCompletionCheck = ({ children }) => {
    const { user, updateProfile, isLoading } = useAuth();
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (user && !user.is_profile_complete && !isLoading) {
            setShowModal(true);
        }
    }, [user, isLoading]);
    const handleSaveProfile = async (profileData) => {
        try {
            await updateProfile(profileData);
            setShowModal(false);
        }
        catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const handleClose = () => {
        // Don't allow closing if profile is not complete
        if (user && user.is_profile_complete) {
            setShowModal(false);
        }
    };
    return (_jsxs(_Fragment, { children: [children, _jsx(OnboardingModal, { open: showModal, onClose: handleClose, onSave: handleSaveProfile })] }));
};
export default ProfileCompletionCheck;
