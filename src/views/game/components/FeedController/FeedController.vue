<template>
  <Feed :location="location" />
</template>

<script>
import Feed from './Feed/Feed.vue';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      location: (state) => state.feed.location
    })
  },
  components: {Feed},
  beforeMount() {
    this.rerenderFeed();
  },
  methods: {
    ...mapActions({
      rerenderFeed: 'commonStore/rerenderFeed'
    })
  }
}
</script>
