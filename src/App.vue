<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

.wrapper {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
