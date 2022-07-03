<template>
  <div class="wrapper" :style="{ height: `${fieldSize}px`, width: `${fieldSize}px` }">
    <div v-for="line in oneLineFields" class="line" :style="{ height: `${squareSize}px` }">
      <div v-for="field in oneLineFields" class="field" :style="{ width: `${squareSize}px` }"></div>
    </div>

    <SnakeController />
    <FeedController />
  </div>

</template>

<script>
import { mapState } from 'vuex';

import SnakeController from '@/views/game/components/SnakeController/SnakeController.vue';
import FeedController from '@/views/game/components/FeedController/FeedController.vue';

export default {
  components: {SnakeController, FeedController},
  data: () => ({
    oneLineFields: []
  }),
  computed: {
    ...mapState({
      lineSize: state => state.settings.lineSize,
      fieldSize: state => state.settings.fieldSize,
      squareSize: state => state.settings.squareSize,
    })
  },
  beforeMount() {
    this.oneLineFields = new Array(this.lineSize).fill('');
  }
}

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
