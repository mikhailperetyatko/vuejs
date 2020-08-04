<template>
<main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      Количество найденных товаров: {{ productsAmount }} шт.
    </span>
  </div>
  <div class="content__catalog">
    <ProductFilter
      @resetPagination="page = 1"
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
</main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

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
      page: 1,
      productsPerPage: 6,
      filters: {
        priceFrom: this.defaultFilterValues.priceFrom,
        priceTo: this.defaultFilterValues.priceTo,
        categoryIds: this.defaultFilterValues.categoryIds,
        colors: this.defaultFilterValues.colors,
      },
    };
  },
  computed: {
    filteredProducts() {
      return products.filter(
        (item) => (
          (!this.filters.priceFrom || item.price >= this.filters.priceFrom)
          && (!this.filters.priceTo || item.price <= this.filters.priceTo)
          && (!this.filters.categoryIds.length || this.filters.categoryIds.indexOf(item.categoryId) > -1)
          && (
            !this.filters.colors.length
            || item.colors.filter((itemColor) => this.filters.colors.indexOf(itemColor) > -1).length
          )
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
      return [...(new Set(products.reduce((accumulator, product) => [...accumulator, ...product.colors], [])))];
    },
  },
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
};
</script>
