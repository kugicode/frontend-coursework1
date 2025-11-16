<script setup>
// We don't need 'ref' or 'computed' here if we only use props
// import { defineProps, defineEmits } from 'vue'; 

// 1. Define Props (Data coming DOWN from App.vue)
const props = defineProps({
    cart: Array,
    customerName: String,
    customerPhone: String,
    isFormValid: Boolean,
});

// 2. Define Emits (Actions going UP to App.vue)
const emit = defineEmits(['remove-lesson', 'submit-order', 'update:customerName', 'update:customerPhone', 'swith-page']);

// 3. Functions to Emit Events (Tells the parent to run the function)

// This function is triggered by the 'delete' button
const removeLesson = (lesson, index) => {
    emit('remove-lesson', lesson, index); // Passes the lesson and index up
};

// This function is triggered by the 'Checkout' button
const submitOrder = () => {
    emit('submit-order'); // Passes no data, just tells parent to checkout
};

// 4. Input Handlers (NEW CODE HERE!)
const updateName = (event) => {
    // When text is typed, emit the 'update:customerName' event 
    // and send the new value (event.target.value) up to the parent.
    emit('update:customerName', event.target.value);
}

const updatePhone = (event) => {
    // When text is typed, emit the 'update:customerPhone' event 
    // and send the new value (event.target.value) up to the parent.
    emit('update:customerPhone', event.target.value);
}

const page = () => {

    emit('swith-page');
}


</script>

<template>
     <button id="homebutn" v-on:click="page">back to home page</button>
        <h1>Checkout Page!</h1>
        <h4>Shopping cart: </h4>
        <div id="shoppingCart-container">
        <div v-for="(lesson, index) in props.cart" :key="index">
         <div id="checkCart">
            <b>Subject: </b>{{ lesson.subject }} <br>
            <b>Location: </b> {{ lesson.location }} <br>
            <b>Price: </b>  {{ lesson.price }}<br> 
            <b>Quantity: </b> {{ lesson.quantity }}
            <p></p>
            <button id="deletebutn" v-on:click="removeLesson(lesson, index)">delete</button>
        </div>
    </div>
        </div>
        <div id="input-forms">
        <p>Name: <input type="text" :value="props.customerName" @input="updateName"></p>
        <p>Phone: <input type="text" :value="props.customerPhone" @input="updatePhone"> </p>
        <button id="checkoutbutn" v-on:click="submitOrder" :disabled="!props.isFormValid">CheckOut! <i class="fa-solid fa-cart-shopping"></i></button>
        </div>

</template>