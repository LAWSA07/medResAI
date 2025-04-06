import axios from 'axios';
// Create axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor for adding auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor for handling common response patterns
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    // Handle 403 Forbidden responses
    if (error.response?.status === 403) {
        console.error('You do not have permission to access this resource');
    }
    return Promise.reject(error);
});
export default api;
