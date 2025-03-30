import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    organization: '',
    role: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data when component mounts
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!formData.name.trim() || !formData.organization.trim() || !formData.role) {
      setError('Name, organization, and role are required');
      return;
    }

    // Phone validation - optional but validated if provided
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone.trim())) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your personal information and profile settings.
      </Typography>

      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="+1 (123) 456-7890"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={formData.role}
                  label="Role"
                  onChange={handleRoleChange}
                  disabled={isSubmitting}
                >
                  <MenuItem value="RESEARCHER">Researcher</MenuItem>
                  <MenuItem value="ACADEMIC">Academic</MenuItem>
                  <MenuItem value="INDUSTRY_PROFESSIONAL">Industry Professional</MenuItem>
                  <MenuItem value="ADMINISTRATOR">Administrator</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;