<template>
  <Snake :location="location" />
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { COORDS_MAP } from '@/misc/constants';
import Snake from './Snake/Snake.vue';

const USED_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

const isIntersects = (location, locations) => locations.some(
    ([x, y]) => location[COORDS_MAP['x']] === x && location[COORDS_MAP['y']] === y
);

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
    this.handleListeners('removeEventListeners');
    this.clearTimer();
  },
  methods: {
    ...mapActions({
      setLocation: 'snake/setLocation',
      setDirection: 'snake/setDirection',
      rerenderFeed: 'commonStore/rerenderFeed'
    }),
    updateLocation() {
      this.clearTimer();

      this.timerId = setTimeout(() => {
        let x = 0;
        let y = 0;

        switch (this.direction) {
          case 'up': y -= 1; break;
          case 'down': y += 1; break;
          case 'left': x -= 1; break;
          case 'right': x += 1; break;
        }

        this.moveSnake([x, y]);
      }, 1000);
    },
    clearTimer() {
      this.timerId && clearTimeout(this.timerId);
    },
    handleListeners(action) {
      document[action]('keydown', this.listenersController);
    },
    listenersController(e) {
      if (USED_KEYS.includes(e.key)) e.preventDefault();

      switch (e.key) {
        case 'ArrowUp':
          this.moveSnake([0, -1]);
          this.setDirection('up');
          break;
        case 'ArrowDown':
          this.moveSnake([0, 1]);
          this.setDirection('down');
          break;
        case 'ArrowRight':
          this.moveSnake([1, 0]);
          this.setDirection('right');
          break;
        case 'ArrowLeft':
          this.moveSnake([-1, 0]);
          this.setDirection('left');
          break;
      }
    },
    initLocation() {
      this.setLocation([[Math.floor(this.lineSize / 2), Math.floor(this.lineSize / 2)]]);
    },
    moveSnake([addX, addY]) {
      let newCoords = this.location.map(([x, y]) => [x + addX, y + addY]);
      let wasIntersect = false;

      if (isIntersects(this.feedLocation[0], newCoords)) {
        newCoords = [...this.location, this.feedLocation[0]];
        wasIntersect = true;
      }

      this.setLocation(newCoords);
      if (wasIntersect) this.rerenderFeed();
    }
  },
  computed: {
    ...mapState({
      totalSquares: (state) => state.snake.totalSquares,
      lineSize: (state) => state.snake.lineSize,
      fieldSize: (state) => state.snake.fieldSize,
      location: (state) => state.snake.location,
      direction: (state) => state.snake.direction,
      feedLocation: (state) => state.feed.location
    })
  }
}
</script>

<style scoped>

</style>
