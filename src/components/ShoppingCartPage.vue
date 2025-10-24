<script setup>
// We don't need 'ref' or 'computed' here if we only use props
import { defineProps, defineEmits } from 'vue'; 

// 1. Define Props (Data coming DOWN from App.vue)
const props = defineProps({
    cart: Array,
    customerName: String,
    customerPhone: String,
    isFormValid: Boolean 
});

// 2. Define Emits (Actions going UP to App.vue)
// We use 'update:' for v-model binding
const emit = defineEmits(['remove-lesson', 'submit-order', 'update:customerName', 'update:customerPhone']);

// 3. Functions to Emit Events (Tells the parent to run the function)

// This function is triggered by the 'delete' button
const removeLesson = (lesson, index) => {
    emit('remove-lesson', lesson, index); // Passes the lesson and index up
};

// This function is triggered by the 'Checkout' button
const submitOrder = () => {
    emit('submit-order'); // Passes no data, just tells parent to checkout
};

</script>

<template>
        <h1>Checkout Page!</h1>
        <h4>Shopping cart: </h4>
        <div id="shoppingCart-container">
        <p v-for="(lesson, index) in props.cart" :key="index">
         <div id="checkCart">
            <b>Subject: </b>{{ lesson.subject }} <br>
            <b>Location: </b> {{ lesson.location }} <br>
            <b>Price: {{ lesson.price }}</b> 
            <p></p>
            <button id="deletebutn" v-on:click="removeLesson(lesson, index)">delete</button>
        </div>
        </p>
        </div>
        <div id="input-forms">
        <p>Name: <input type="text" :value="props.customerName" @input="updateName"></p>
        <p>Phone: <input type="text" :value="props.customerPhone" @input="updatePhone"> </p>
        <button id="checkoutbutn" v-on:click="submitOrder" :disabled="!props.isFormValid">CheckOut! <i class="fa-solid fa-cart-shopping"></i></button>
        </div>

</template>