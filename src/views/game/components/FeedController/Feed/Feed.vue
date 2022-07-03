<template>
  <div v-for="style in styles" :style="style"></div>
</template>

<script>
import { mapState } from 'vuex';

import { getSquareCss } from '@/misc/utils';

export default {
  props: {
    location: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    styles: {}
  }),
  mounted() {
    this.styles = getSquareCss({ locations: this.location, squareSize: this.squareSize }, { background: 'yellow' });
  },
  beforeUpdate() {
    this.styles = getSquareCss({ locations: this.location, squareSize: this.squareSize }, { background: 'yellow' });
  },
  computed: {
    ...mapState({
      squareSize: (state) => state.snake.squareSize
    })
  }
}
</script>

<style scoped>

</style>
