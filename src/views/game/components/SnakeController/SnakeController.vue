<template>
  <Snake :location="location"/>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Snake from './Snake/Snake.vue';

export default {
  components: {Snake},
  data: () => ({
    timerId: null
  }),
  beforeMount() {
    this.initLocation();
  },
  mounted() {
    this.handleListeners('addEventListener');
    this.updateLocation();
  },
  beforeUpdate() {
    this.updateLocation();
  },
  beforeUnmount() {
    this.handleListeners('removeEventListener');
    this.clearTimer();
  },
  methods: {
    ...mapActions({
      setLocation: 'snake/setLocation',
      setDirection: 'snake/setDirection',
      rerenderFeed: 'commonStore/rerenderFeed',
      moveSnake: 'commonStore/moveSnake'
    }),
    updateLocation() {
      this.clearTimer();

      this.timerId = setTimeout(() => this.moveSnake(), this.speed);
    },
    clearTimer() {
      if (this.timerId) clearTimeout(this.timerId);
    },
    handleListeners(action) {
      document[action]('keydown', this.listenersController);
    },
    listenersController(e) {
      let newDirection;

      switch (e.key) {
        case 'ArrowUp':
          newDirection = 'up';
          break;
        case 'ArrowDown':
          newDirection = 'down';
          break;
        case 'ArrowRight':
          newDirection = 'right';
          break;
        case 'ArrowLeft':
          newDirection = 'left';
          break;
      }

      if (newDirection) {
        e.preventDefault();

        if (this.direction === newDirection) this.moveSnake();
        else this.setDirection(newDirection);
      }
    },
    initLocation() {
      this.setLocation([[Math.floor(this.lineSize / 2), Math.floor(this.lineSize / 2)]]);
    },
  },
  computed: {
    ...mapState({
      totalSquares: state => state.settings.totalSquares,
      lineSize: state => state.settings.lineSize,
      fieldSize: state => state.settings.fieldSize,
      location: state => state.snake.location,
      direction: state => state.snake.direction,
      speed: state => state.settings.snakeSpeed
    })
  }
}
</script>

<style scoped>

</style>
