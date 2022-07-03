<template>
  <div class="wrapper">
    <BackButton class="backBtn" />

    <form class="form">
      <label>
        Скорость змейки:
        <input type="number" placeholder="в мс" :value="speed" @input="onSpeedChange">
      </label>
      <label>
        Размер поля:
        <input type="number" placeholder="в пикселях" :value="fieldSize" @input="onFieldSizeChange">
      </label>
      <label>
        Количество квадратов в одной строке:
        <input type="number" placeholder="в пикселях" :value="lineSize" @input="onLineSizeChange">
      </label>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BackButton from '@/components/BackButton.vue';

export default {
  components: {BackButton},
  computed: {
    ...mapState({
      speed: state => state.settings.snakeSpeed,
      fieldSize: state => state.settings.fieldSize,
      lineSize: state => state.settings.lineSize
    })
  },
  methods: {
    ...mapActions({
      changeSpeed: 'settings/changeSpeed',
      changeFieldSize: 'settings/changeFieldSize',
      changeLineSize: 'settings/changeLineSize'
    }),
    onSpeedChange({ target: { valueAsNumber } }) {
      this.changeSpeed(valueAsNumber);
    },
    onFieldSizeChange({ target: { valueAsNumber } }) {
      this.changeFieldSize(valueAsNumber);
    },
    onLineSizeChange({ target: { valueAsNumber } }) {
      this.changeLineSize(valueAsNumber)
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;

  position: relative;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.backBtn {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
