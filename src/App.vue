<template>
  <component :is="currentPageComponent"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  productPage: 'ProductPage',
};

export default {
  name: 'App',
  props: {
    defaultFilterValues: {
      type: Object,
      default: () => ({
        priceFrom: 100,
        priceTo: 100000,
        categoryIds: [],
        colors: [],
      }),
    },
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
