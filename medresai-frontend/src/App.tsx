import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import ProtectedRoute from './components/features/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import ProfileCompletionCheck from './components/features/onboarding/ProfileCompletionCheck';

// Import page components
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import PredictPage from './pages/dashboard/PredictPage';
import HistoryPage from './pages/dashboard/HistoryPage';
import PredictionDetailsPage from './pages/dashboard/PredictionDetailsPage';
import WorkPage from './pages/dashboard/WorkPage';

// Placeholder for dashboard page components (will be implemented later)
const SponsorsPage = () => <div>Our Sponsors Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <Navigate to="/dashboard/predict" />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/predict"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <PredictPage />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/history"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <HistoryPage />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/prediction/:id"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <PredictionDetailsPage />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/work"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <WorkPage />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/sponsors"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <SponsorsPage />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/research" element={<WorkPage />} />
      </Routes>
    </Router>
  );
}

export default App;
