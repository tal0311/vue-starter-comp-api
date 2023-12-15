<template>
    <div class="user-msg" :class="msg.type" v-if="msg">
      <span>
        {{ msg.txt }}
      </span>
      <button class="icon close-btn grid" @click="msg = null" v-html="$getSvg('close')"></button>
    </div>
  </template>
  <script setup>
  
  
  import { eventBus } from '@/services/event-bus.service.js'
  import { onUnmounted, ref, onBeforeMount } from 'vue'
  
  
  const msg = ref({txt: 'hello', type: 'success'})
  const unsubscribe = ref(null)
  onBeforeMount(() => {
    unsubscribe.value = eventBus.on('show-msg', handleMsg)
  })
  
  function handleMsg(userMsg) {
    msg.value = userMsg
    setTimeout(() => {
      msg.value = null
    }, 5000)
  }
  
  onUnmounted(() => {
    unsubscribe.value()
  })
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/setup/variables.scss';
  
  .user-msg {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    color: $clr1;
    background: $clr2;
    display: grid;
    grid-auto-flow: column;
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
    gap: 2rem;
  
    button {
      i {
        font-size: medium;
        fill: $clr1;
      }
    }
  }
  
  .close-btn {
    fill: $clr1;
  }
  </style>
  