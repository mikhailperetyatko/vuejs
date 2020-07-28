<template>
<div class="content__catalog">
  <ProductFilter />
  <section class="catalog">
    <ProductList :products="products" />
    <BasePagination :current-page="page" :per-page="productsPerPage" :amount="productsAmount" v-model="page" />
  </section>
</div>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  data() {
    return {
      page: 1,
      productsPerPage: 6,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    productsAmount() {
      return products.length;
    },
  },
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
};
</script>
