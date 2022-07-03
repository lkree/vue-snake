<template>
  <BackButton class="backBtn" />
  <Field />
</template>

<script>
import { mapState } from 'vuex';

import BackButton from '@/components/BackButton.vue';
import Field from './components/Field/Field.vue';

export default {
  components: {BackButton, Field },
  computed: {
    ...mapState({
      phase: state => state.phase.phase
    })
  },
  watch: {
    phase() {
      if (this.phase === 'end' || this.phase === 'win') this.$router.push('/end');
    }
  }
}
</script>

<style scoped>
.backBtn {
  position: absolute;

  top: 10px;
  left: 10px;
}
</style>
