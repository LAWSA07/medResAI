import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import ProtectedRoute from './components/features/auth/ProtectedRoute.tsx';
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
import VirusPredictionPage from './pages/dashboard/VirusPredictionPage/index.tsx';
import SimpleIndexPage from './pages/SimpleIndexPage';
import MoleculeVisualizerPage from './pages/dashboard/MoleculeVisualizerPage';
import CustomDashboard from './pages/dashboard/CustomDashboard';
import PredictionForm from './pages/dashboard/PredictionForm';

// Placeholder for dashboard page components (will be implemented later)
const SponsorsPage = () => <div>Our Sponsors Page</div>;

// Temporary debug component to test if the app is loading with Disy-inspired design
const DebugPage = () => (
  <div style={{
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif',
    color: '#212121'
  }}>
    <div style={{
      textAlign: 'center',
      marginBottom: '60px'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        margin: '20px 0 30px',
        background: 'linear-gradient(45deg, #1B5E20 30%, #43A047 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        MedResAI
      </h1>
      <p style={{
        fontSize: '1.25rem',
        maxWidth: '700px',
        margin: '0 auto 40px',
        color: '#757575',
        lineHeight: 1.5
      }}>
        Advanced medical research platform powered by artificial intelligence.
        Predict therapeutic sequences and discover antiviral candidates.
      </p>
    </div>

    <div style={{
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '60px'
    }}>
      {/* Feature Card 1 */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        padding: '40px 30px',
        textAlign: 'center',
        maxWidth: '350px',
        flex: '1 1 300px',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }}>
        <div style={{
          backgroundColor: 'rgba(46, 125, 50, 0.08)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <span style={{
            fontSize: '2rem',
            color: '#2E7D32'
          }}>🧬</span>
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '15px'
        }}>Virus Prediction</h3>
        <p style={{
          color: '#757575',
          marginBottom: '30px',
          lineHeight: 1.6
        }}>
          Submit viral genome sequences and receive therapeutic target predictions powered by deep learning.
        </p>
        <a href="/virus-prediction" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
          transition: 'all 0.2s ease-in-out'
        }}>Try Virus Prediction</a>
      </div>

      {/* Feature Card 2 */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        padding: '40px 30px',
        textAlign: 'center',
        maxWidth: '350px',
        flex: '1 1 300px',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }}>
        <div style={{
          backgroundColor: 'rgba(46, 125, 50, 0.08)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <span style={{
            fontSize: '2rem',
            color: '#2E7D32'
          }}>🔍</span>
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '15px'
        }}>User Account</h3>
        <p style={{
          color: '#757575',
          marginBottom: '30px',
          lineHeight: 1.6
        }}>
          Create an account to save your predictions, track results, and collaborate with other researchers.
        </p>
        <a href="/login" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'white',
          color: '#2E7D32',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          border: '1.5px solid #2E7D32',
          transition: 'all 0.2s ease-in-out'
        }}>Sign In</a>
      </div>
    </div>

    <div style={{
      background: 'rgba(46, 125, 50, 0.04)',
      borderRadius: '12px',
      padding: '40px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h3 style={{
        fontSize: '1.75rem',
        fontWeight: 600,
        color: '#2E7D32',
        marginBottom: '20px'
      }}>Ready to transform medical research?</h3>
      <p style={{
        color: '#424242',
        marginBottom: '30px',
        fontSize: '1.1rem',
        lineHeight: 1.6,
        maxWidth: '600px',
        margin: '0 auto 30px'
      }}>
        Join our platform and leverage the power of AI to accelerate the development of antiviral therapies.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <a href="/virus-prediction" style={{
          display: 'inline-block',
          padding: '14px 30px',
          background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
          transition: 'all 0.2s ease-in-out'
        }}>Start Predicting</a>
        <a href="/signup" style={{
          display: 'inline-block',
          padding: '14px 30px',
          background: 'white',
          color: '#2E7D32',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          border: '1.5px solid #2E7D32',
          transition: 'all 0.2s ease-in-out'
        }}>Create Account</a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Use the dramatic SimpleIndexPage as the main entry point */}
        <Route path="/" element={<SimpleIndexPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/virus-prediction" element={<VirusPredictionPage />} />

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

        {/* New Custom Dashboard Route */}
        <Route
          path="/dashboard/custom"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <CustomDashboard />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />

        {/* New Advanced Prediction Form Route */}
        <Route
          path="/dashboard/predict-advanced"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <PredictionForm />
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
                  <VirusPredictionPage />
                </DashboardLayout>
              </ProfileCompletionCheck>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/virus"
          element={
            <ProtectedRoute>
              <ProfileCompletionCheck>
                <DashboardLayout>
                  <VirusPredictionPage />
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
        <Route
          path="/molecules"
          element={
            <DashboardLayout>
              <MoleculeVisualizerPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
