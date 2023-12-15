<template>
    <div>
        <h1>Contact Us</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="formData.name" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email" />
            </div>
            <div>
                <label for="message">Message:</label>
                <textarea id="message" v-model="formData.message"></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import {  reactive } from 'vue';
// convert to reactive
const formData = reactive({
    name: '',
    email: '',
    message: '',
});



const submitForm = () => {
    console.log('form data:', formData);
    // Handle form submission logic here
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
