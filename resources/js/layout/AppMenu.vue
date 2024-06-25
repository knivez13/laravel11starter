<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Navigation',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-id-card',
                to: '/pages/empty'
            },

            {
                label: 'Maintenance',
                icon: 'pi pi-fw pi-id-card',
                items: [
                    {
                        label: 'Property',
                        icon: 'pi pi-fw pi-id-card',
                        to: '/pages/empty'
                    },
                    {
                        label: 'Group Section',
                        icon: 'pi pi-fw pi-id-card',
                        to: '/pages/empty'
                    },
                    {
                        label: 'Item List',
                        icon: 'pi pi-fw pi-id-card',
                        to: '/pages/empty'
                    },
                    {
                        label: 'Item Location',
                        icon: 'pi pi-fw pi-id-card',
                        to: '/pages/empty'
                    },
                    {
                        label: 'Type',
                        icon: 'pi pi-fw pi-id-card',
                        to: '/pages/empty'
                    }
                ]
            }
        ]
    }

    // {
    //     label: 'Hierarchy',
    //     items: [
    //         {
    //             label: 'Submenu 1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 1.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 1.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         {
    //             label: 'Documentation',
    //             icon: 'pi pi-fw pi-question',
    //             to: '/documentation'
    //         }
    //     ]
    // }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
