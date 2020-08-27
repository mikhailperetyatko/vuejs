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
        :filters.sync="filters"
        @resetPagination="page = 1"
      />
      <section class="catalog">
        <ProductList
          :products="products"
          :loading="loadingProducts"
          :loading-errors="loadingProductsErrors"
          @reloadProductList="loadProducts()"
        />
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
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import timeoutWithPromise from '@/helpers/timeoutWithPromise';

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
      productsData: null,
      filters: this.$route.params.filters ?? {},
      loadingProducts: false,
      loadingProductsErrors: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items
        : [];
    },
    productsAmount() {
      return this.productsData
        ? this.productsData.pagination.total
        : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filters() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.loadingProducts = true;
      this.loadingProductsErrors = false;
      return timeoutWithPromise()
        .then(() => {
          axios.get(`${BASE_API_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              ...this.filters,
            },
          })
            .then((response) => {
              this.productsData = {
                items: response.data.items.map((item) => ({
                  ...item,
                  img: item.image.file.url,
                })),
                pagination: response.data.pagination,
              };
            })
            .catch(() => {
              this.loadingProductsErrors = true;
            })
            .then(() => {
              this.loadingProducts = false;
            });
        });
    },
  },
};
</script>
