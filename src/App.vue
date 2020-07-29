<template>
<div class="content__catalog">
  <ProductFilter :category-id.sync="filters.categoryId" :price-from.sync="filters.priceFrom" :price-to.sync="filters.priceTo" />
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
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        color: '',
      },
    };
  },
  computed: {
    filteredProducts() {
      return products.filter(
        (item) => (
          (this.filters.priceFrom === 0 || item.price >= this.filters.priceFrom)
          && (this.filters.priceTo === 0 || item.price <= this.filters.priceTo)
          && (this.filters.categoryId === 0 || item.categoryId === this.filters.categoryId)
          && (!this.filters.color.length || item.colors.indexOf(this.filters.color) > -1)
        ),
      );
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    productsAmount() {
      return this.filteredProducts.length;
    },
  },
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
};
</script>
