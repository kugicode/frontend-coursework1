<script setup>
import { ref } from 'vue';
import { computed } from 'vue';

const cart = ref([]);


const lessons = ref([{
    subject: "Maths",
    location: "London",
    price: 100,
    spaces: 5,
    icon: "fa-solid fa-calculator"
},
{
 subject: "Science",
    location: "London",
    price: 50,
    spaces: 7,
    icon: "fa-solid fa-flask"
},
{
 subject: "English",
    location: "London",
    price: 120,
    spaces: 4,
    icon: "fa-solid fa-pen"
  },

    { 
    subject: "History",
    location: "London",
    price: 45,
    spaces: 2,
    icon: "fa-solid fa-timeline"
    },

     { 
    subject: "Computing",
    location: "new barnet",
    price: 55,
    spaces: 6,
    icon: "fa-solid fa-square-binary"
    },

       { 
    subject: "Geography",
    location: "hendon",
    price: 66,
    spaces: 3,
    icon: "fa-solid fa-book-atlas"
    },
        { 
    subject: "Art and Design",
    location: "centra london",
    price: 75,
    spaces: 7,
    icon: "fa-solid fa-book-atlas"
    },
        { 
    subject: "French",
    location: "North Finchley",
    price: 85,
    spaces: 8,
    icon: "fa-solid fa-language"
    },
        { 
    subject: "Music",
    location: "Edgware",
    price: 55,
    spaces: 1,
    icon: "fa-solid fa-music"
    },
            { 
    subject: "Religious studies",
    location: "hendon",
    price: 44,
    spaces: 9,
    icon: "fa-solid fa-kaaba"
    },
]  ) 

const addToCart = (lesson) => {
  cart.value.push(lesson);

  lesson.spaces--;
}

const itemsInTheCart = computed(() => {
  return cart.value.length;
})

</script>

<template>
<span v-for="lesson in lessons">
<p></p>
  <span >Subject: {{ lesson.subject }}</span>
<br>
    <span>Location: {{ lesson.location }} </span>
<br>
  <span>Price: {{ lesson.price }}</span>
<br>
  <span>Spaces: {{ lesson.spaces }}</span>
    <i v-bind:class="lesson.icon"></i>

    <button v-on:click="addToCart(lesson)" :disabled="lesson.spaces === 0">Add to cart</button>

</span>

<h1>Shopping cart: {{itemsInTheCart}}</h1>

</template>

<style scoped></style>