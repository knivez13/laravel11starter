import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.js';

const service = axios.create({
    baseURL: '/',
    timeout: 1000, // Request timeout
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
});

service.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        let token = authStore.get_token;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token; // Set JWT token
        }
        return config;
    },
    (error) => {
        console.log(error); // for debug
        Promise.reject(error);
    }
);
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
        switch (error.response.status) {
            case 200:
                console.log('OK');
                break;
            case 401:
                console.log('Unauthorized');
                router.push('/login');
                break;
            case 404:
                console.log('Not found');
                router.push('/auth/access');
                break;
            case 419:
                console.log('Session expired');
                break;
            case 500:
                console.log('Internal Server Error');
                break;
            case 503:
                console.log('Down for maintenance');
                break;
            default:
                return Promise.reject(error);
        }
    }
);

export default service;
