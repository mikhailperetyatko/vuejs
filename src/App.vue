<template>
  <component :is="currentPageComponent" :pageParams="currentPageParams"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import eventBus from '@/eventBus';

const routes = {
  main: 'MainPage',
  productPage: 'ProductPage',
};

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  methods: {
    gotoPage(pageName, pageparams) {
      this.currentPage = pageName;
      this.currentPageParams = pageparams;
    },
  },
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
};
</script>
