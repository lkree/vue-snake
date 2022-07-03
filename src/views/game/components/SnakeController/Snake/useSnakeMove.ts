import { onMounted } from 'vue';
import { useStore } from 'vuex';

export const useSnakeMove = () => {
    const { state: { snake: { location } }, dispatch } = useStore();

    onMounted(() => {
        setInterval(() => {
            dispatch('snake/setLocation', [location[0], location[1] - 1])
        }, 5000);
    });
}
