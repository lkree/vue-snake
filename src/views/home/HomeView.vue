<template>
  <div class="wrapper">
    <button @click="onStartClick" class="btn start">Start</button>
    <button @click="onSettingsClick" class="btn">Settings</button>
  </div>

</template>

<script>

import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      setGame: 'phase/setGame',
    }),
    onStartClick() {
      this.$router.push('/game');
      this.setGame();
    },
    onSettingsClick() {
      this.$router.push('/settings');
    }
  },

}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.btn {
  width: 80px;

  padding: 5px;
}

.start {
  margin-bottom: 10px;
}
</style>
