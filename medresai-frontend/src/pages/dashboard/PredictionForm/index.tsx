import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  FormHelperText,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  alpha,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Science as ScienceIcon,
  Send as SendIcon,
  Save as SaveIcon,
  RotateLeft as RotateLeftIcon
} from '@mui/icons-material';

// Define validation schema using yup
const predictionSchema = yup.object({
  // Step 1: Basic Information
  compoundName: yup.string().required('Compound name is required'),
  smiles: yup.string()
    .required('SMILES notation is required')
    .min(5, 'SMILES notation must be at least 5 characters')
    .matches(
      /^([^J][a-zA-Z0-9@+\-\[\]\(\)\\\/%=#$]{6,})$/,
      'Invalid SMILES notation format'
    ),
  compoundType: yup.string().required('Compound type is required'),
  targetPathogen: yup.string().required('Target pathogen is required'),

  // Step 2: Physical Properties
  molecularWeight: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Molecular weight is required')
    .positive('Molecular weight must be positive')
    .max(1000, 'Value exceeds maximum allowed (1000)'),
  logP: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('LogP is required')
    .min(-5, 'LogP must be greater than -5')
    .max(10, 'LogP must be less than 10'),
  numHDonors: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Number of H-donors is required')
    .integer('Must be a whole number')
    .min(0, 'Cannot be negative')
    .max(15, 'Maximum value exceeded'),
  numHAcceptors: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Number of H-acceptors is required')
    .integer('Must be a whole number')
    .min(0, 'Cannot be negative')
    .max(15, 'Maximum value exceeded'),

  // Step 3: Advanced Options
  modelType: yup.string().required('Model type is required'),
  confidenceThreshold: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Confidence threshold is required')
    .min(0.5, 'Threshold must be at least 0.5')
    .max(0.99, 'Threshold must be less than 1'),
  includeVisualizations: yup.boolean(),
  notes: yup.string().max(500, 'Notes cannot exceed 500 characters')
});

// Form value types
type PredictionFormValues = yup.InferType<typeof predictionSchema>;

// Default form values
const defaultValues: PredictionFormValues = {
  compoundName: '',
  smiles: '',
  compoundType: '',
  targetPathogen: '',
  molecularWeight: undefined,
  logP: undefined,
  numHDonors: undefined,
  numHAcceptors: undefined,
  modelType: 'standard',
  confidenceThreshold: 0.7,
  includeVisualizations: true,
  notes: ''
};

// Compound type options
const compoundTypes = [
  { value: 'small_molecule', label: 'Small Molecule' },
  { value: 'peptide', label: 'Peptide' },
  { value: 'nucleotide', label: 'Nucleotide' },
  { value: 'natural_product', label: 'Natural Product' },
  { value: 'other', label: 'Other' }
];

// Target pathogen options
const targetPathogens = [
  { value: 'sars_cov_2', label: 'SARS-CoV-2' },
  { value: 'influenza', label: 'Influenza' },
  { value: 'hiv', label: 'HIV' },
  { value: 'hcv', label: 'Hepatitis C' },
  { value: 'tuberculosis', label: 'Tuberculosis' },
  { value: 'other', label: 'Other' }
];

// Model type options
const modelTypes = [
  { value: 'standard', label: 'Standard Model' },
  { value: 'deep_learning', label: 'Deep Learning' },
  { value: 'ensemble', label: 'Ensemble Method' },
  { value: 'quantum', label: 'Quantum Computing Enhanced' }
];

// Form steps
const formSteps = [
  { label: 'Basic Information', optional: false },
  { label: 'Physical Properties', optional: false },
  { label: 'Advanced Options', optional: true }
];

// Main component
const PredictionForm: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Initialize react-hook-form with yup validation
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset, trigger } = useForm<PredictionFormValues>({
    resolver: yupResolver(predictionSchema),
    defaultValues,
    mode: 'onChange'
  });

  // Handle form submission
  const onSubmit = async (data: PredictionFormValues) => {
    // Simulate API call
    console.log('Submitting form with data:', data);

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    setSnackbarOpen(true);

    // Reset form after successful submission
    reset(defaultValues);
    setActiveStep(0);
  };

  // Handle navigation between form steps
  const handleNext = async () => {
    // Validate current step fields before proceeding
    const fieldsToValidate = getFieldsForCurrentStep();
    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Get fields that belong to the current step
  const getFieldsForCurrentStep = (): (keyof PredictionFormValues)[] => {
    switch (activeStep) {
      case 0:
        return ['compoundName', 'smiles', 'compoundType', 'targetPathogen'];
      case 1:
        return ['molecularWeight', 'logP', 'numHDonors', 'numHAcceptors'];
      case 2:
        return ['modelType', 'confidenceThreshold', 'includeVisualizations', 'notes'];
      default:
        return [];
    }
  };

  // Check if fields in the current step have errors
  const hasStepErrors = (): boolean => {
    const currentFields = getFieldsForCurrentStep();
    return currentFields.some(field => !!errors[field]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        New Prediction Job
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Submit a new compound for antiviral activity prediction.
      </Typography>

      {/* Form Steps */}
      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
          '& .MuiStepLabel-root .Mui-completed': {
            color: theme.palette.success.main
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: theme.palette.primary.main
          }
        }}
      >
        {formSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel optional={step.optional ? <Typography variant="caption">Optional</Typography> : undefined}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="compoundName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Compound Name"
                      fullWidth
                      error={!!errors.compoundName}
                      helperText={errors.compoundName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="compoundType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Compound Type"
                      select
                      fullWidth
                      error={!!errors.compoundType}
                      helperText={errors.compoundType?.message}
                    >
                      {compoundTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="smiles"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="SMILES Notation"
                      fullWidth
                      error={!!errors.smiles}
                      helperText={errors.smiles?.message || "Enter the SMILES notation for your compound (e.g., CC(=O)OC1=CC=CC=C1C(=O)O for Aspirin)"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="targetPathogen"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Target Pathogen"
                      select
                      fullWidth
                      error={!!errors.targetPathogen}
                      helperText={errors.targetPathogen?.message}
                    >
                      {targetPathogens.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          )}

          {/* Step 2: Physical Properties */}
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Physical Properties
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Enter the physical and chemical properties of your compound. These are used to improve prediction accuracy.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="molecularWeight"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Molecular Weight (g/mol)"
                      fullWidth
                      error={!!errors.molecularWeight}
                      helperText={errors.molecularWeight?.message}
                      InputProps={{ inputProps: { min: 0, max: 1000 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="logP"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="LogP (Octanol-Water Partition)"
                      fullWidth
                      error={!!errors.logP}
                      helperText={errors.logP?.message}
                      InputProps={{ inputProps: { min: -5, max: 10, step: 0.1 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="numHDonors"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Number of H-Bond Donors"
                      fullWidth
                      error={!!errors.numHDonors}
                      helperText={errors.numHDonors?.message}
                      InputProps={{ inputProps: { min: 0, max: 15 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="numHAcceptors"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Number of H-Bond Acceptors"
                      fullWidth
                      error={!!errors.numHAcceptors}
                      helperText={errors.numHAcceptors?.message}
                      InputProps={{ inputProps: { min: 0, max: 15 } }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}

          {/* Step 3: Advanced Options */}
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Advanced Options
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure advanced prediction settings. Default values work well for most cases.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="modelType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Prediction Model"
                      select
                      fullWidth
                      error={!!errors.modelType}
                      helperText={errors.modelType?.message || "Select the AI model to use for prediction"}
                    >
                      {modelTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="confidenceThreshold"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Confidence Threshold"
                      fullWidth
                      error={!!errors.confidenceThreshold}
                      helperText={errors.confidenceThreshold?.message || "Minimum confidence level (0.5-0.99) for results"}
                      InputProps={{ inputProps: { min: 0.5, max: 0.99, step: 0.01 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Additional Notes"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.notes}
                      helperText={errors.notes?.message || `${field.value.length}/500 characters`}
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<RotateLeftIcon />}
            >
              Back
            </Button>

            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => reset(defaultValues)}
                sx={{ mr: 1 }}
              >
                Reset
              </Button>

              {activeStep === formSteps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || hasStepErrors()}
                  startIcon={<SendIcon />}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Prediction'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={hasStepErrors()}
                  endIcon={<SaveIcon />}
                >
                  Continue
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Prediction job submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PredictionForm;