<template>
    <nav :class="`app-nav grid blur-bg ${setNavHeight}`">
        <div class="nav-icon grid" v-html="$getSvg('open')" @click="toggleNav"></div>
        <div class="nav-container grid">
            <RouterLink v-for="route in routing" @click="toggleNav" :key="route.name" :to="route.path">{{ route.name }}
            </RouterLink>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { routing } from '@/router/index.js';

const isNavOpen = ref(false);
function toggleNav() {
    isNavOpen.value = !isNavOpen.value;
}

const setNavHeight = computed(() => {
    return isNavOpen.value ? 'open' : '';
});
</script>

<style lang="scss">
.app-nav {


    .nav-container {
        width: 100vw;
        justify-content: space-between;
        height: 90vh;
    }

    position: fixed;
    bottom: 0;
    transform: translateY(95%);
    transition: transform 0.3s ease-in-out;


    .nav-icon {
        height: 10vh;
        justify-self: center;

        svg {
            transform: rotate(268deg);
        }

    }

    &.open {
        z-index: 1000;
        transform: translateY(5%);

        .nav-icon {
            justify-self: center;

            svg {
                transform: rotate(90deg) !important;
                // transform: rotate(268deg);
            }

        }
    }

    a {
        text-align: center;
        margin: 0 auto;
        width: 100vw;
        display: grid;
        place-content: center;
    }
}
</style>
