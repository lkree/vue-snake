<template>
  <div class="wrapper" :style="{ height: `${fieldSize}px`, width: `${fieldSize}px` }">
    <div v-for="line in oneLineFields" class="line" :style="{ height: `${squareSize}px` } ">
      <div v-for="field in oneLineFields" class="field" :style="{ width: `${squareSize}px` }"></div>
    </div>

    <SnakeController />
    <FeedController />
  </div>

</template>

<script setup lang="ts">
import { useStore } from 'vuex';

import SnakeController from '@/views/game/components/SnakeController/SnakeController.vue';
import FeedController from '@/views/game/components/FeedController/FeedController.vue';

const { lineSize, fieldSize, squareSize } = useStore().state.snake;
const oneLineFields = new Array(lineSize).fill('');

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.line {
  display: flex;
  width: 100%;
}

.field {
  background: teal;
  border: 1px solid #000;
}
</style>
