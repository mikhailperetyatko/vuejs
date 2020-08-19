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
        :colors="productColors"
        :filters.sync="filters"
        @resetPagination="page = 1"
      />
      <section class="catalog">
        <ProductList :products="products" />
        <BasePagination
          v-if="productsAmount > productsPerPage"
          v-model="page"
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
import paginationsComputedFunction from '@/helpers/paginationsComputedFunction';
import validate from '@/helpers/validate';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      filters: this.$route.params.filters ?? {},
    };
  },
  computed: {
    filteredProducts() {
      return products.filter(
        (item) => (
          (!this.filters.priceFrom || item.price >= this.filters.priceFrom)
          && (!this.filters.priceTo || item.price <= this.filters.priceTo)
          && (
            !this.filters.categoryIds
            || !this.filters.categoryIds.length
            || this.filters.categoryIds.indexOf(item.categoryId) > -1)
          && (
            !this.filters.colors
            || !this.filters.colors.length
            || item.colors.filter((itemColor) => this.filters.colors.indexOf(itemColor) > -1).length
          )
        ),
      );
    },
    products() {
      return paginationsComputedFunction.products(this.filteredProducts, this.page, this.productsPerPage);
    },
    productsAmount() {
      return paginationsComputedFunction.itemsAmount(this.filteredProducts);
    },
    productColors() {
      return [...(new Set(products.reduce((accumulator, product) => [...accumulator, ...product.colors], [])))];
    },
  },
};
</script>
