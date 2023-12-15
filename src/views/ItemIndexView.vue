<template>
    <section v-if="items">
        <h1>Item Index View</h1>
        <ItemList :items="items" @removeItem="remove"/>
        <RouterView/>
    </section>
</template>

<script setup>
import ItemList from '@/components/ItemList.vue'
import { useItemStore} from '@/stores/itemStore.js';
import { onBeforeMount,  computed } from 'vue';
const itemStore = useItemStore();
const items = computed(() => itemStore.getItems);

onBeforeMount(() => {
    loadItems();
});

function remove(itemId) {
    console.log('removing item', itemId);
    // itemStore.removeItem(id);
}

async function loadItems() {
    console.log('loading items');
   await itemStore.loadItems();
}

</script>

<style lang="scss" scoped>
</style>