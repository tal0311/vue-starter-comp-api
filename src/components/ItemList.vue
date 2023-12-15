<template>
    <section class="item-list">
        <ItemPreview v-for="item in props.items" :is="'is-preview'" :item="item" :key="item.id" 
        @removeItem="remove" />
        
    </section>
</template>

<script setup>
import ItemPreview from '@/components/ItemPreview.vue'
const props = defineProps({
    items: Array
})

const emit = defineEmits(['removeItem']);

function remove(itemId) {
    console.log('removing item', itemId);
    // itemStore.removeItem(id);
    emit('removeItem', itemId)
}

</script>
