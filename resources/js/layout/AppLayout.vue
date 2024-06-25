<script setup>
import { computed, watch, ref } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
// import AppConfig from './AppConfig.vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-theme-light bg-light-1': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark bg-light-1': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay bg-light-1': layoutConfig.menuMode.value === 'overlay',
        'layout-static bg-light-1': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive bg-light-1': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active bg-light-1': layoutState.overlayMenuActive.value,
        'layout-mobile-active bg-light-1': layoutState.staticMenuMobileActive.value,
        'p-input-filled bg-light-1': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled bg-light-1': !layoutConfig.ripple.value
    };
});
const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>
        <div class="layout-main-container">
            <div class="layout-main ">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <!-- <app-config></app-config> -->
        <div class="layout-mask"></div>
    </div>
    <Toast />
</template>

<style lang="scss">
.grid-table-line {
    margin: 0;
    white-space: nowrap;
}
.bg-light-1 {
    background-image: repeating-linear-gradient(
            135deg,
            rgba(202, 202, 202, 0.09) 0px,
            rgba(202, 202, 202, 0.09) 1px,
            transparent 1px,
            transparent 11px
        ),
        repeating-linear-gradient(
            45deg,
            rgba(202, 202, 202, 0.09) 0px,
            rgba(202, 202, 202, 0.09) 1px,
            transparent 1px,
            transparent 11px
        ),
        linear-gradient(90deg, rgb(251, 251, 251), rgb(251, 251, 251));
}
</style>
