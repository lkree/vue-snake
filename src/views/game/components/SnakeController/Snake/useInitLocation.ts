import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

export const useInitLocation = () => {
    const { state, dispatch } = useStore();
    const { lineSize } = state.snake;

    onBeforeMount(() => dispatch('snake/setLocation', [Math.floor(lineSize / 2), Math.floor(lineSize / 2)]));
};
