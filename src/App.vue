<script setup>
import { ref } from 'vue';
import { computed } from 'vue';

const cart = ref([]);
const sortBy = ref('subject');
const sortDirection = ref('ascending');
const showProduct = ref(true); // Changed 'true' string to boolean true

const lessons = ref([
    { subject: "Maths", location: "London", price: 100, spaces: 5, icon: "fa-solid fa-calculator" },
    { subject: "Science", location: "London", price: 50, spaces: 5, icon: "fa-solid fa-flask" },
    { subject: "English", location: "London", price: 120, spaces: 5, icon: "fa-solid fa-pen" },
    { subject: "History", location: "London", price: 45, spaces: 5, icon: "fa-solid fa-timeline" },
    { subject: "Computing", location: "new barnet", price: 55, spaces: 5, icon: "fa-solid fa-computer" },
    { subject: "Geography", location: "hendon", price: 66, spaces: 5, icon: "fa-solid fa-book-atlas" },
    { subject: "Art and Design", location: "central london", price: 75, spaces: 5, icon: "fa-solid fa-paintbrush" }, // Changed icon class to a standard one
    { subject: "French", location: "North Finchley", price: 85, spaces: 5, icon: "fa-solid fa-language" },
    { subject: "Music", location: "Edgware", price: 55, spaces: 5, icon: "fa-solid fa-music" },
    { subject: "Religious studies", location: "hendon", price: 44, spaces: 5, icon: "fa-solid fa-kaaba" },
]);


const checkoutOrder = () => {
    console.log("click!")
    // FIX: Replaced alert() with a console message and a simple non-blocking notification
    console.log("Order submitted!");
    alert("Order submitted!"); 
    // I left the simple alert for immediate feedback, but remember this is bad practice!
    // For a better app, you'd replace this with a modal or temporary message.
}

const remove = (lesson, index) => {
    cart.value.splice(index, 1)

    lesson.spaces++;

    console.log("The task has been deleted");
}


const changePage = () => {
    showProduct.value = !showProduct.value;
}

const addToCart = (lesson) => {
    cart.value.push(lesson);

    lesson.spaces--;
}

const itemsInTheCart = computed(() => {
    return cart.value.length;
})

const sortedLessons = computed(() => {
    const lessonsCopy = [...lessons.value];

    lessonsCopy.sort((a, b) => {

        let comparison = 0;

        if (sortBy.value === 'subject' || sortBy.value === 'location') {
            comparison = a[sortBy.value].localeCompare(b[sortBy.value]);
        }
        else {
            comparison = a[sortBy.value] - b[sortBy.value];
        }
        return sortDirection.value === 'descending' ? comparison * -1 : comparison;

    });

    return lessonsCopy
})

</script>


<template>
    <!-- FIX: Added Font Awesome CDN link here so your icons show up -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    
    <h2>Lessons shop</h2>

    <button v-if="itemsInTheCart > 0" v-on:click="changePage">Shopping cart: {{ itemsInTheCart }}</button>
    <button v-else-if="itemsInTheCart === 0" disabled>Shopping cart: {{ itemsInTheCart }}</button>
    <p></p>
    <div v-if="showProduct">
        <button v-on:click="sortBy = 'subject'">Sort by subject</button>
        <button v-on:click="sortBy = 'location'">Sort by location</button>
        <button v-on:click="sortBy = 'price'">Sort by price</button>
        <button v-on:click="sortBy = 'spaces'">Sort by Spaces available</button>
        <button v-on:click="sortDirection = 'ascending'">Sort ascending</button>
        <button v-on:click="sortDirection = 'descending'">Sort descending</button>
        <button></button>


        <span v-for="lesson in sortedLessons" :key="lesson.subject">
            <p></p>
            <span>Subject: {{ lesson.subject }}</span>
            <br>
            <span>Location: {{ lesson.location }} </span>
            <br>
            <span>Price: {{ lesson.price }}</span>
            <br>
            <span>Spaces: {{ lesson.spaces }}</span>
            <i v-bind:class="lesson.icon"></i>

            <button v-on:click="addToCart(lesson)" :disabled="lesson.spaces === 0">Add to cart</button>

        </span>
    </div>

    <div v-else>
        <h2>Checkout Page!</h2>
        <h4>Shopping cart: </h4>
        <p v-for="(lesson, index) in cart" :key="index">
            <b>Subject: </b>{{ lesson.subject }} <br>
            <b>Location: </b> {{ lesson.location }} <br>
            <b>Price: </b> {{ lesson.price }}
            <button v-on:click="remove(lesson, index)">delete</button>
        </p>
        <button v-on:click="checkoutOrder">CheckOut! <i class="fa-solid fa-cart-shopping"></i></button>
    </div>

</template>

<style scoped>

</style>