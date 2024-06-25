import { defineStore } from 'pinia';
import { csrf, login } from '@/api/authApi.js';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: [],
        user: [],
        roles: [],
        permission: []
    }),
    getters: {
        get_token: (state) => state.token
    },
    actions: {
        async clear() {
            this.token = [];
            this.user = [];
            this.roles = [];
            this.permission = [];
            setTimeout(() => router.push('/login'), 500);
        },
        async loginUser(res) {
            csrf().then(({ data }) => {
                login(res).then(({ data }) => {
                    console.log(data);
                    this.$state.token = data.token;
                    this.$state.user = data.user;
                    this.$state.roles = data.roles;
                    this.$state.permission = data.permission;
                    if (data.token && data.user) {
                        setTimeout(() => router.push('/'), 500);
                    }
                });
            });
        }
    },
    persist: true
});
