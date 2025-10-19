<script setup>
import { ref } from 'vue';
import { computed } from 'vue'; // imported ref so variables are reactive and computed for computed functions

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

const isFormValid = computed(() => {
 
    const nameRegex = /^[a-zA-Z]+$/;

 const phoneRegex = /^[0-9]+$/;

 const nameIsValid = nameRegex.test(customerName.value.trim());
 const phoneIsValid = phoneRegex.test(customerPhone.value.trim());

 return nameIsValid && phoneIsValid && cart.value.length > 0;
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&display=swap" rel="stylesheet">    
    <h1>Lessons shop</h1>
    <div id="button-search">
    <button id="butnCart" v-if="itemsInTheCart > 0" v-on:click="changePage">Shopping cart: {{ itemsInTheCart }}</button>
    <button id="butnCart" v-else-if="itemsInTheCart === 0" disabled>Shopping cart: {{ itemsInTheCart }}</button>
    
    </div>
   <div id="sort" v-if="showProduct">
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

    <div v-else>
        <h1>Checkout Page!</h1>
        <h4>Shopping cart: </h4>
        <div id="shoppingCart-container">
        <p v-for="(lesson, index) in cart" :key="index">
         <div id="checkCart">
            <b>Subject: </b>{{ lesson.subject }} <br>
            <b>Location: </b> {{ lesson.location }} <br>
            <b>Price: </b> {{ lesson.price }}
            <p></p>
            <button id="deletebutn" v-on:click="remove(lesson, index)">delete</button>
        </div>
        </p>
        </div>
        <div id="input-forms">
        <p>Name: <input type="text" v-model="customerName"></p>
        <p>Phone: <input type="text" v-model="customerPhone"></p>
        <button v-on:click="checkoutOrder" :disabled="!isFormValid">CheckOut! <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
    </div>

</template>

<style>
html, body{
    background-color: antiquewhite;
}

h1{
    text-align: center;
    font-family: "Bitcount Prop Single", system-ui;
}

#button-search{
text-align: center;
}


#butnCart{
    border: none;
    border-radius: 10px;
    padding: 5px;
    background-color: aqua;
}


#butnCart:hover{
background-color: rgb(0, 165, 165);
cursor: pointer;
}


#sort{
    text-align: center;
}

#lessons{
    border: 1px solid black;
    background-color: beige;
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
}

#searchinput{
    border: none;
    border-radius: 4px;
    padding: 2px;
}

#cartbutn{
    border: none;
    padding: 3px 5px;
    background-color: aquamarine;
    border-radius: 4px;
}

#cartbutn:hover{
 background-color: rgb(90, 182, 151);
 cursor: pointer;
}

#icons{
    font-size: 32px;
    color: brown;
    display: flex;
    justify-content: center;
    align-items: center;
}

#lessons-container {
    display: grid;
    /* This is the key part: it tells the container to create 5 columns 
       of equal width (1 fraction unit, 1fr) */
    grid-template-columns: repeat(5, 250px); 
    gap: 15px; /* Adds consistent space between the lesson cards */
    /* ... centering and responsive styles ... */
    justify-content: center;
}

h4{
    text-align: center;
}

#checkCart{
 text-align: center;
 background-color: azure;
 border: 2px solid black;
}

#shoppingCart-container{
    display: grid;
    /* This is the key responsive part:
       auto-fit creates as many columns as possible.
       minmax(250px, 1fr) ensures columns are never smaller than 250px, 
       but stretch equally (1fr) to fill the row. */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    gap: 25px; 
    max-width: 1200px; 
    margin: 0 auto;
    padding: 20px;
}

#deletebutn{
    border: none;
    margin-bottom: 5px;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: rgb(255, 111, 111);
}

#deletebutn:hover{
    background-color: rgb(194, 84, 84);
    cursor: pointer;
}

#input-forms{
    text-align: center;
}



</style>