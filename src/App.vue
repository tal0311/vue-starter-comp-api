
<template>
  <section class="app-container">
    <header>
      <UserPreview :user="loggedUser"/>
      <AppNav />
    </header>
    <main>
      <RouterView />
    </main>
    <UserMsg />
  </section>
</template>

<script setup>
import UserPreview from '@/components/UserPreview.vue';
import AppNav from '@/components/AppNav.vue';
import UserMsg from '@/components/UserMsg.vue';


import { useUserStore} from '@/stores/userStore.js';
import { onBeforeMount,  computed } from 'vue';
const userStore = useUserStore();
const loggedUser = computed(() => userStore.getLoggedUser);

onBeforeMount(() => {
    loadUser();
});

async function loadUser() {
    console.log('loading user');
   await userStore.loadUser();
}



</script>
<style scoped></style>
