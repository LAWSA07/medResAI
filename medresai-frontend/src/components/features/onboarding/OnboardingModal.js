import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const OnboardingModal = ({ open, onClose, onSave }) => {
    const [profileData, setProfileData] = useState({
        name: '',
        phoneNumber: '',
        organization: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    const handleRoleChange = (e) => {
        const { value } = e.target;
        setProfileData(prev => ({ ...prev, role: value }));
        // Clear error when user selects a role
        if (errors.role) {
            setErrors(prev => ({ ...prev, role: undefined }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!profileData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!profileData.organization.trim()) {
            newErrors.organization = 'Organization is required';
        }
        if (!profileData.role) {
            newErrors.role = 'Role is required';
        }
        // Simple phone validation
        if (profileData.phoneNumber.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(profileData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSaveProfile = () => {
        if (validateForm()) {
            onSave(profileData);
        }
    };
    return (_jsx(Modal, { open: open, onClose: onClose, "aria-labelledby": "onboarding-modal-title", disableEscapeKeyDown: true, disableAutoFocus: true, children: _jsx(Box, { sx: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: '500px' },
                p: 0,
                outline: 'none',
            }, children: _jsxs(Paper, { elevation: 3, sx: { p: 4 }, children: [_jsx(Typography, { id: "onboarding-modal-title", variant: "h5", component: "h2", gutterBottom: true, children: "Complete Your Profile" }), _jsx(Typography, { variant: "body1", color: "text.secondary", sx: { mb: 3 }, children: "Please provide the following information to complete your profile and get started with MedResAI." }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Full Name", name: "name", value: profileData.name, onChange: handleChange, error: !!errors.name, helperText: errors.name, required: true }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Phone Number", name: "phoneNumber", value: profileData.phoneNumber, onChange: handleChange, error: !!errors.phoneNumber, helperText: errors.phoneNumber, placeholder: "+1 (123) 456-7890" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Organization", name: "organization", value: profileData.organization, onChange: handleChange, error: !!errors.organization, helperText: errors.organization, required: true }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { fullWidth: true, error: !!errors.role, required: true, children: [_jsx(InputLabel, { id: "role-select-label", children: "Role" }), _jsxs(Select, { labelId: "role-select-label", id: "role-select", value: profileData.role, label: "Role", onChange: handleRoleChange, children: [_jsx(MenuItem, { value: "RESEARCHER", children: "Researcher" }), _jsx(MenuItem, { value: "ACADEMIC", children: "Academic" }), _jsx(MenuItem, { value: "INDUSTRY_PROFESSIONAL", children: "Industry Professional" }), _jsx(MenuItem, { value: "ADMINISTRATOR", children: "Administrator" })] }), errors.role && (_jsx(Typography, { variant: "caption", color: "error", children: errors.role }))] }) })] }), _jsx(Box, { sx: { mt: 4, display: 'flex', justifyContent: 'flex-end' }, children: _jsx(Button, { variant: "contained", onClick: handleSaveProfile, size: "large", children: "Save Profile" }) })] }) }) }));
};
export default OnboardingModal;
