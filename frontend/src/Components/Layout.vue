<script setup lang="ts">
import { ref } from 'vue';
import TgButton from './TelegramTheme/Button/TgButton.vue';
import type { Variant } from './TelegramTheme/Button/types';

const buttons = ref<Variant[]>([
  'fill', 
  // 'bezeled', 
  // 'plain', 
  // 'gray', 
  // 'outline', 
  // 'white'
])
</script>

<template>
  <div class="">
    <div class="flex flex-col h-screen">
        <header>123</header>
        <div class="grow">
          <div class="flex flex-col mx-2.5 space-y-2.5">
          <TgButton v-for="button in buttons" :variant="button">{{ button }}</TgButton>
          </div>
        </div>
        <footer>123</footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
  
</style>
