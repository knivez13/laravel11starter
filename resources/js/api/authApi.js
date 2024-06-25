import request from '@/utils/request';

export function csrf() {
    return request({
        url: 'sanctum/csrf-cookie',
        method: 'get'
    });
}

export function login(data) {
    return request({
        url: 'api/login',
        method: 'post',
        data: data
    });
}

export function logout() {
    return request({
        url: 'api/logout',
        method: 'get'
    });
}
