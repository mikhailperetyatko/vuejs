<template>
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
  />
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
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
  methods: {
    gotoPage(pageName, pageparams) {
      this.currentPage = pageName;
      this.currentPageParams = pageparams;
    },
  },
};
</script>
