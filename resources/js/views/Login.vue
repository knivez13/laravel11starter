<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { useAuthStore } from '@/stores/useAuthStore.js';
const {} = storeToRefs(useAuthStore());
const { loginUser } = useAuthStore();

const rules = {
    email: { required },
    password: { required }
};
const state = ref({
    email: '',
    password: ''
});

const v$ = useVuelidate(rules, state);

const login = async () => {
    const result = await v$.value.$validate();
    if (result) {
        await loginUser(state.value);
    }
};

const logoUrl = computed(() => {
    return `layout/images/logo-dark.svg`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <h2 class="text-600 font-medium">Sign in</h2>
                    </div>

                    <div>
                        <Form @submit.prevent="login">
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="state.email" />
                            <div v-if="v$.email.$error" class="text-red-500">Group Section field has an error.</div>

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="state.password" placeholder="Password" :toggleMask="true" :feedback="false" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            <div v-if="v$.password.$error" class="text-red-500">Group Section field has an error.</div>

                            <Button label="Sign In" class="w-full p-3 text-xl" type="submit"></Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
