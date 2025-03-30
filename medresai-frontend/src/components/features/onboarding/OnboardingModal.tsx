import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (profileData: ProfileData) => void;
}

export interface ProfileData {
  name: string;
  phoneNumber: string;
  organization: string;
  role: string;
}

const OnboardingModal = ({ open, onClose, onSave }: OnboardingModalProps) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    phoneNumber: '',
    organization: '',
    role: ''
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phoneNumber?: string;
    organization?: string;
    role?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setProfileData(prev => ({ ...prev, role: value }));

    // Clear error when user selects a role
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      phoneNumber?: string;
      organization?: string;
      role?: string;
    } = {};

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

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="onboarding-modal-title"
      disableEscapeKeyDown
      disableAutoFocus
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '500px' },
          p: 0,
          outline: 'none',
        }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography id="onboarding-modal-title" variant="h5" component="h2" gutterBottom>
            Complete Your Profile
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please provide the following information to complete your profile and get started with MedResAI.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                placeholder="+1 (123) 456-7890"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization"
                name="organization"
                value={profileData.organization}
                onChange={handleChange}
                error={!!errors.organization}
                helperText={errors.organization}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.role} required>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={profileData.role}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="RESEARCHER">Researcher</MenuItem>
                  <MenuItem value="ACADEMIC">Academic</MenuItem>
                  <MenuItem value="INDUSTRY_PROFESSIONAL">Industry Professional</MenuItem>
                  <MenuItem value="ADMINISTRATOR">Administrator</MenuItem>
                </Select>
                {errors.role && (
                  <Typography variant="caption" color="error">
                    {errors.role}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSaveProfile}
              size="large"
            >
              Save Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default OnboardingModal;