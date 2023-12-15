<template>
    <dialog ref="itemDialog" class="item-details" @click="closeDialog">
        <section v-if="item" class="item-container">
            <h1>Item Details</h1>
            <p>{{ item.name }}</p>
            <p>{{ item }}</p>
        </section>
    </dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useItemStore } from '@/stores/itemStore';
// TODO : update store current item

const itemDialog = ref(null);
onMounted(() => {
    loadItem();
});

const route = useRoute();
const itemStore = useItemStore();
const item = computed(() => itemStore.getCurrItem);


async function loadItem() {
    const { id } = route.params;
    await itemStore.getItemById(id);
    openDialog();
}

function openDialog() {
    itemDialog.value.showModal();
};

const router = useRouter()
function closeDialog({ target: { classList } }) {
    if (classList.contains('item-details')) {
        router.back()
        itemDialog.value.close();
    }
}

</script>
