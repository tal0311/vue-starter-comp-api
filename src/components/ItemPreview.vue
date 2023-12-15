<template>
    <section :class="['item-preview', is]" @click="navigateTo">
        <h4>{{ props.item.name}}</h4>
        {{ props.item }}
        <button v-html="$getSvg('remove')" @click.stop="$emit('removeItem', props.item._id)"></button>
               
        <hr>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    item: Object,
    is: String,
});

const router = useRouter();
function navigateTo() {
    console.log('navigate to item');
    console.log(props.item.value);
    router.push(`/item/${props.item._id}`);
}

</script>

<style scoped>
/* Add component-specific styles here */
</style>
