import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const SponsorsPage = () => _jsx("div", { children: "Our Sponsors Page" });
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(ProfileCompletionCheck, { children: _jsx(DashboardLayout, { children: _jsx(Navigate, { to: "/dashboard/predict" }) }) }) }) }), _jsx(Route, { path: "/dashboard/predict", element: _jsx(ProtectedRoute, { children: _jsx(ProfileCompletionCheck, { children: _jsx(DashboardLayout, { children: _jsx(PredictPage, {}) }) }) }) }), _jsx(Route, { path: "/dashboard/history", element: _jsx(ProtectedRoute, { children: _jsx(ProfileCompletionCheck, { children: _jsx(DashboardLayout, { children: _jsx(HistoryPage, {}) }) }) }) }), _jsx(Route, { path: "/dashboard/prediction/:id", element: _jsx(ProtectedRoute, { children: _jsx(ProfileCompletionCheck, { children: _jsx(DashboardLayout, { children: _jsx(PredictionDetailsPage, {}) }) }) }) }), _jsx(Route, { path: "/dashboard/work", element: _jsx(ProtectedRoute, { children: _jsx(ProfileCompletionCheck, { children: _jsx(DashboardLayout, { children: _jsx(WorkPage, {}) }) }) }) }), _jsx(Route, { path: "/dashboard/sponsors", element: _jsx(ProtectedRoute, { children: _jsx(ProfileCompletionCheck, { children: _jsx(DashboardLayout, { children: _jsx(SponsorsPage, {}) }) }) }) }), _jsx(Route, { path: "/dashboard/profile", element: _jsx(ProtectedRoute, { children: _jsx(DashboardLayout, { children: _jsx(ProfilePage, {}) }) }) }), _jsx(Route, { path: "/dashboard/research", element: _jsx(WorkPage, {}) })] }) }));
}
export default App;
