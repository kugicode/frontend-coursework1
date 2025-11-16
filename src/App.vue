<script setup>
import { ref, computed, onMounted } from 'vue'; // imported ref so variables are reactive and computed for computed functions
import './styles.css'
import ShoppingCartPage from './components/ShoppingCartPage.vue';

const cart = ref([]);
const sortBy = ref('subject');
const sortDirection = ref('ascending');
const showProduct = ref(true); // Changed 'true' string to boolean true
const customerName = ref('');
const customerPhone = ref('');
const search = ref('');

const lessons = ref([]);

const fetchLessons = async () => {
    try{
        //Fetch the data using the backend server's URL address
        const response = await fetch('http://localhost:3000/lessons');

        if(!response.ok){
            throw new Error(`Failed to fetch lessons: ${response.statusText}`);
        }

        const data = await response.json();
        lessons.value = data; //Update the lessons array with live data
    }
    catch(error){
        console.error("Failed to fetch lessons:", error);
    }
};

onMounted(() => {
    fetchLessons();
})

const checkoutOrder = () => {
    // This is where the POST request will go later
    console.log("click!")
    console.log("Order submitted!");
    alert("Order submitted!"); 
}

// FIX 2: Updated remove function to decrease quantity and only remove the item if quantity is 0.
const remove = (cartItem, index) => { 
    // Decrease the quantity of the item in the cart
    cartItem.quantity--;
    
    // Find the original lesson and increase its spaces (local simulation for now)
    const originalLesson = lessons.value.find(l => l._id === cartItem._id); //Must use MongoDB's _id
    if (originalLesson) {
        originalLesson.spaces++;
    }
    
    // If quantity hits zero, remove the item entirely from the cart array
    if (cartItem.quantity === 0) {
        cart.value.splice(index, 1);
    }

    console.log("Item quantity reduced or deleted from cart.");
}


const changePage = () => {
    showProduct.value = !showProduct.value; //changes the page once the shopping cart is clicked changes values by using the !.
}

// FIX 1: Updated addToCart logic to check for existing item and increase quantity.
const addToCart = (lesson) => { 
    // 1. Check if the lesson is already in the cart (by using the unique ID we added)
    const existingItem = cart.value.find(item => item._id === lesson._id);

    if (existingItem) {
        // 2. If it exists, just increase the quantity
        existingItem.quantity++;
    } else {
        // 3. If it's new, add it to the cart with a quantity of 1
        // We use spread operator { ...lesson } to copy the lesson and add the new quantity property
        cart.value.push({ ...lesson, quantity: 1 });
    }

    // 4. Reduce the lesson space (This logic remains the same)
    lesson.spaces--;
}

const itemsInTheCart = computed(() => { 
    // FIX 3: Calculate total items by summing the quantity of each cart item
    return cart.value.reduce((total, item) => total + item.quantity, 0);
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

// FIX: Robust Validation Logic (This version allows spaces in the name and correctly checks phone)
const isFormValid = computed(() => {
    const nameValue = customerName.value.trim();
    const phoneValue = customerPhone.value.trim();

    // 1. Check for illegal characters (anything BUT letters/spaces)
    const hasInvalidNameChars = /[^a-zA-Z\s]/.test(nameValue);
    // 2. Check for illegal characters (anything BUT numbers)
    const hasInvalidPhoneChars = /[^0-9]/.test(phoneValue);

    // Final check: Must have content, and NO invalid characters, and items in cart
    const nameIsValid = nameValue.length > 0 && !hasInvalidNameChars;
    const phoneIsValid = phoneValue.length > 0 && !hasInvalidPhoneChars;

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
    @swith-page="changePage"
/>
<!--put css on diffrent file-->
</template>
