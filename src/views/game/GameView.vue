<template>
  <div class="wrapper">
    <FieldComponent />
  </div>
</template>

<style>
.wrapper {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script setup lang="ts">
import FieldComponent from './components/Field/FieldComponent.vue';
</script>
