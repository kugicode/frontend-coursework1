<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([
{sender: 'bot', text: "Hello!"}
]);

const toggleChat = () => {
    isOpen.value = !isOpen.value
    console.log(isOpen.value);
}

const sendMessage = async () => {
    if(!userInput.value.trim()){
        return;
    }
// 1. Add User Message to Chat Array
const text = userInput.value;
messages.value.push({ sender: 'user', text: text });
userInput.value = '';

    //fetching the data from the backend
    try{
    const response = await fetch('https://backend-coursework1.onrender.com/chat', { 
        method: 'POST',
        headers: {"Content-Type": "application/json"},  
        body: JSON.stringify({message: text})
    });

    const data = await response.json();

    messages.value.push({sender: 'bot', text: data.reply});

    }
    catch(error){

    }
}

</script>

<template>
    <button class="chat-toggle" @click="toggleChat">
        <img v-if="!isOpen" src="https://backend-coursework1.onrender.com/images/bot.webp" alt="chat" class="bot-icon">
        <span v-else>❌</span>
    </button>

    <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
            <h3>Chatbot</h3>
        </div>

        <div class="chat-messages">
            <div 
                v-for="(msg, index) in messages" 
                :key="index" 
                :class="['message', msg.sender]"
            >
                {{ msg.text }}
            </div>
        </div>

        <div class="chat-input">
            <input 
                type="text" 
                v-model="userInput" 
                @keyup.enter="sendMessage" 
                placeholder="Ask me something..."
            >
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>