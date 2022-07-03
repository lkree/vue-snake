<template>
  <div v-for="style in styles" :style="style"></div>
</template>

<script>
import { mapState } from 'vuex';

import { getSquareCss } from '@/misc/utils';

export default {
  props: {
    location: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    styles: []
  }),
  mounted() {
    this.styles = this.getStyles();
  },
  beforeUpdate() {
    this.styles = this.getStyles();
  },
  methods: {
    getStyles() {
      return getSquareCss({ locations: this.location, squareSize: this.squareSize }, { zIndex: 1 });
    }
  },
  computed: {
    ...mapState({
      squareSize: (state) => state.settings.squareSize
    })
  }
}

</script>
