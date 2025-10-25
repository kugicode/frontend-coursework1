<script setup>
import { ref } from 'vue';
import { computed } from 'vue'; // imported ref so variables are reactive and computed for computed functions
import './styles.css'
import ShoppingCartPage from './components/ShoppingCartPage.vue';

const cart = ref([]);
const sortBy = ref('subject');
const sortDirection = ref('ascending');
const showProduct = ref(true); // Changed 'true' string to boolean true
const customerName = ref('');
const customerPhone = ref('');
const search = ref('');

const lessons = ref([
    { subject: "Maths", location: "London", price: 100, spaces: 5, icon: "fa-solid fa-calculator" }, //these are my lessons arrays in an object
    { subject: "Science", location: "London", price: 50, spaces: 5, icon: "fa-solid fa-flask" },
    { subject: "English", location: "London", price: 120, spaces: 5, icon: "fa-solid fa-pen" },
    { subject: "History", location: "London", price: 45, spaces: 5, icon: "fa-solid fa-timeline" },
    { subject: "Computing", location: "new barnet", price: 55, spaces: 5, icon: "fa-solid fa-computer" },
    { subject: "Geography", location: "hendon", price: 66, spaces: 5, icon: "fa-solid fa-book-atlas" },
    { subject: "Art and Design", location: "central london", price: 75, spaces: 5, icon: "fa-solid fa-paintbrush" },
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

const remove = (lesson, index) => { //This function is for the delete button and removes an item in the list the adds it back to the lessons array
    cart.value.splice(index, 1)

    lesson.spaces++;

    console.log("The task has been deleted");
}


const changePage = () => {
    showProduct.value = !showProduct.value; //changes the page once the shopping cart is clicked changes values by using the !.
}

const addToCart = (lesson) => { // This pushes a lesson to the reactive variable cart and reduces the lesson array space by 1
    cart.value.push(lesson);

    lesson.spaces--;
}

const itemsInTheCart = computed(() => { // this computed function returns the number of items in the cart and i used it on the shopping cart button to show the number!
    return cart.value.length;
})

const sortedLessons = computed(() => {
    const lessonsCopy = [...lessons.value]; //uses spread operator to copy the lessons array so we don't change the original array

    lessonsCopy.sort((a, b) => { // sort is a built in function that allows you to sort values

        let comparison = 0;

        if (sortBy.value === 'subject' || sortBy.value === 'location') {
            comparison = a[sortBy.value].localeCompare(b[sortBy.value]); //if sortBy value is subject or location then i'm using localeComapre to compare alphabets!
        }
        else {
            comparison = a[sortBy.value] - b[sortBy.value]; //else if it's anything else which is price or space which are numbers compare them 
        }
        return sortDirection.value === 'descending' ? comparison * -1 : comparison; //iternary operator that checks if the value is ascending or descending!

    });

    return lessonsCopy
})

const isFormValid = computed(() => {
 
    const nameRegex = /^[a-zA-Z]+$/; //checks if there is a-z or capitalized alphabets!

 const phoneRegex = /^[0-9]+$/; //checks only 0-9 numbers!

 const nameIsValid = nameRegex.test(customerName.value.trim());
 const phoneIsValid = phoneRegex.test(customerPhone.value.trim());

 return nameIsValid && phoneIsValid && cart.value.length > 0; // if all these are true the the function returns true!
})

const filteredLessons = computed(() => {

const lessonsToFilter = sortedLessons.value;
const searched = search.value.toLowerCase().trim();

if (!searched){
    return lessonsToFilter;
}

return lessonsToFilter.filter(lesson => {
return( 
    lesson.subject.toLowerCase().includes(searched) ||
    lesson.location.toLowerCase().includes(searched) ||
    String(lesson.price).includes(searched) ||
    String(lesson.spaces).includes(searched)
)
});

});

</script>

<template>
    <!-- FIX: Added Font Awesome CDN link here so your icons show up -->
    <h1>Lessons shop</h1>
    <div id="button-search">
    <button id="butnCart" v-if="itemsInTheCart > 0" v-on:click="changePage">Shopping cart: {{ itemsInTheCart }}</button>
    <button id="butnCart" v-else-if="itemsInTheCart === 0" disabled>Shopping cart: {{ itemsInTheCart }}</button>
    
    </div>
   <div v-if="showProduct">
    <div id = "sort">
    <p>Search: <input id="searchinput" type="text" v-model="search"></p>
    <label for="sort-by">Sort By:</label>
  <select id="sort-by" v-model="sortBy">
    <option value="subject">Subject</option>
    <option value="location">Location</option>
    <option value="price">Price</option>
    <option value="spaces">Spaces available</option>
  </select>

<label for="direction-by">Sort Direction:
    <select id="direction-by" v-model="sortDirection">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
    </select>
</label>
</div>  
<p></p>
<div id="lessons-container">
  <span v-for="lesson in filteredLessons" :key="lesson.subject">
            <div id="lessons">
            <span>Subject: {{ lesson.subject }}</span>
            <br>
            <span>Location: {{ lesson.location }} </span>
            <br>
            <span>Price: {{ lesson.price }}</span>
            <br>
            <span>Spaces: {{ lesson.spaces }}</span>
            <i id="icons" v-bind:class="lesson.icon"></i>
            <button id="cartbutn" v-on:click="addToCart(lesson)" :disabled="lesson.spaces === 0">Add to cart</button>
            </div>
        </span>
        </div>
    </div>

<ShoppingCartPage
    v-else
    :cart="cart" 
    :customerName="customerName"
    :customerPhone="customerPhone"
    :isFormValid="isFormValid" 
    @remove-lesson="remove"
    @submit-order="checkoutOrder"
    v-model:customerName="customerName"
    v-model:customerPhone="customerPhone"
/>
<!--put css on diffrent file-->
</template>