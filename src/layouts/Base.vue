<template>
  <div>
    <Header :title="$route.meta.title" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/layouts/Header.vue';
import Footer from '@/layouts/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
