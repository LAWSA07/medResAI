import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
// Custom Grid component to avoid repetitive component prop
const GridItem = ({ children, ...props }) => (_jsx(Grid, { component: "div", item: true, ...props, children: children }));
const ProfilePage = () => {
    const { user, updateProfile, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        organization: '',
        role: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                organization: user.organization || '',
                role: user.role || ''
            });
        }
    }, [user]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleRoleChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, role: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!formData.name.trim() || !formData.organization.trim() || !formData.role) {
            setError('Name, organization, and role are required');
            return;
        }
        if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone.trim())) {
            setError('Please enter a valid phone number');
            return;
        }
        setIsSubmitting(true);
        try {
            await updateProfile(formData);
            setSuccess('Profile updated successfully');
        }
        catch (error) {
            setError(error.message || 'Failed to update profile. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (isLoading) {
        return (_jsx(Box, { sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }, children: _jsx(CircularProgress, {}) }));
    }
    return (_jsxs(Container, { maxWidth: "md", children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "User Profile" }), _jsx(Typography, { variant: "body1", color: "text.secondary", paragraph: true, children: "Manage your personal information and profile settings." }), _jsxs(Paper, { elevation: 2, sx: { p: 4, mt: 4 }, children: [error && (_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })), success && (_jsx(Alert, { severity: "success", sx: { mb: 3 }, children: success })), _jsx(Box, { component: "form", onSubmit: handleSubmit, children: _jsxs(Grid, { container: true, spacing: 3, component: "div", children: [_jsx(GridItem, { xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Full Name", name: "name", value: formData.name, onChange: handleChange, disabled: isSubmitting, required: true }) }), _jsx(GridItem, { xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Phone Number", name: "phone", value: formData.phone, onChange: handleChange, disabled: isSubmitting, placeholder: "+1 (123) 456-7890" }) }), _jsx(GridItem, { xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Organization", name: "organization", value: formData.organization, onChange: handleChange, disabled: isSubmitting, required: true }) }), _jsx(GridItem, { xs: 12, children: _jsxs(FormControl, { fullWidth: true, required: true, children: [_jsx(InputLabel, { id: "role-select-label", children: "Role" }), _jsxs(Select, { labelId: "role-select-label", id: "role-select", value: formData.role, label: "Role", onChange: handleRoleChange, disabled: isSubmitting, children: [_jsx(MenuItem, { value: "RESEARCHER", children: "Researcher" }), _jsx(MenuItem, { value: "ACADEMIC", children: "Academic" }), _jsx(MenuItem, { value: "INDUSTRY_PROFESSIONAL", children: "Industry Professional" }), _jsx(MenuItem, { value: "ADMINISTRATOR", children: "Administrator" })] })] }) }), _jsx(GridItem, { xs: 12, children: _jsx(Button, { type: "submit", variant: "contained", size: "large", disabled: isSubmitting, sx: { mt: 2 }, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(CircularProgress, { size: 24, sx: { mr: 1 } }), "Saving..."] })) : 'Save Changes' }) })] }) })] })] }));
};
export default ProfilePage;
