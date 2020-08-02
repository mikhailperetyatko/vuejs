<template>
<div class="content__catalog">
  <ProductFilter
    :filters.sync="filters"
    :colors="productColors"
  />
  <section class="catalog">
    <ProductList :products="products" />
    <BasePagination v-model="page"
      :current-page="page"
      :per-page="productsPerPage"
      :amount="productsAmount"
    />
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
    productColors() {
      const colors = products.map((product) => (product.colors)).join(',').split(',');
      // фильтруем дубли
      return colors.filter((color, index) => (colors.indexOf(color) === index));
    },
  },
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
};
</script>
