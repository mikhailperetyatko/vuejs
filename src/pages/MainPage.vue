<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        Количество найденных товаров: {{ filteredProducts.length }} шт.
      </span>
    </div>
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
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
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
