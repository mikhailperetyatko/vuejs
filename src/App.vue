<template>
  <BaseLayout />
</template>

<script>
import BaseLayout from '@/layouts/Base.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    BaseLayout,
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.$store.commit('updateUserAccessKey', userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
  },
};
</script>
