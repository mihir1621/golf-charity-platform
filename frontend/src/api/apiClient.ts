import axios from 'axios';
import { auth } from '../config/firebase';

const isProduction = import.meta.env.PROD;

const apiClient = axios.create({
  baseURL: isProduction ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Firebase ID Token to every protected request
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
