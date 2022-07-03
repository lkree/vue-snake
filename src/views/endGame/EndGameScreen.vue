<template>
  <div class="wrapper">
    <div v-if="!isWin">Game Over :(</div>
    <div v-else>ПОБЕДААААА!!</div>
    <button @click="restartGame">Начать сначала?</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    timerId: null
  }),
  computed: {
    ...mapGetters({
      isWin: 'phase/isWin'
    })
  },
  methods: {
    ...mapActions({
      setStart: 'phase/setStart',
      setGame: 'phase/setGame'
    }),
    restartGame() {
      this.$router.push('/game');
      this.setGame();
    }
  },
  mounted() {
    if (!this.isWin) {
      this.timerId = setTimeout(() => {
        this.$router.push('/');
        this.setStart();
      }, 5000);
    }
  },
  beforeUnmount() {
    clearTimeout(this.timerId);
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
