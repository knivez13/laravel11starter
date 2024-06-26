import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.js';

const service = axios.create({
    baseURL: '/',
    timeout: 60000, // Request timeout
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
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
        // console.log(error); // for debug
        Promise.reject(error);
    }
);
service.interceptors.response.use(null, (err) => {
    const error = {
        status: err.response?.status,
        original: err,
        validation: {},
        message: null
    };

    switch (err.response?.status) {
        case 422:
            for (let field in err.response.data.data) {
                error.validation[field] = err.response.data.data[field][0];
            }
            break;

        case 403:
            error.message = "You're not allowed to do that.";
            break;
        case 401:
            error.message = 'Please re-login.';
            break;
        case 500:
            error.message = 'Something went really bad. Sorry.';
            break;
        default:
            error.message = 'Something went wrong. Please try again later.';
    }

    return Promise.reject(error);
});

export default service;
