import { defineStore } from 'pinia';
import { csrf, login, logout } from '@/api/authApi.js';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: [],
        user: [],
        roles: [],
        permission: [],
        processing: false,
        error: []
    }),
    getters: {
        get_token: (state) => state.token
    },
    actions: {
        async clear() {
            csrf().then(({ e }) => {
                logout().then(({ data }) => {
                    this.token = [];
                    this.user = [];
                    this.roles = [];
                    this.permission = [];
                    setTimeout(() => router.push('/login'), 500);
                });
            });
        },
        async loginUser(res) {
            if (this.processing) return;
            this.processing = true;
            this.error = null;
            await csrf().then(async ({ e }) => {
                await login(res)
                    .then((data) => {
                        console.log(data.data);
                        if (data.data == 'Wrong Username or Password') {
                            this.error = data.data;
                        }
                        if (data?.data.token && data?.data.user) {
                            this.$state.token = data.data.token;
                            this.$state.user = data.data.user;
                            this.$state.roles = data.data.roles;
                            this.$state.permission = data.data.permission;
                            setTimeout(() => router.push('/'), 500);
                            this.error = null;
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        this.error = e;
                    })
                    .finally(() => {
                        this.processing = false;
                    });
            });
        }
    },
    persist: true
});
