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
        <Loadable
          method="get"
          url="/api/products/"
          :params="params"
          @success="productsData=$event"
        >
          <template v-slot:spinner>
            <Spinner />
          </template>
          <template v-slot:content>
            <ProductList
              :products="products"
            />
          </template>
        </Loadable>
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
import Spinner from '@/components/Spinner.vue';
import Loadable from '@/components/Loadable.vue';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    Spinner,
    Loadable,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      productsData: null,
      filters: this.$route.params.filters ?? {},
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((item) => ({
          ...item,
          img: item.image.file.url,
        }))
        : [];
    },
    productsAmount() {
      return this.productsData
        ? this.productsData.pagination.total
        : 0;
    },
    params() {
      return {
        page: this.page,
        limit: this.productsPerPage,
        ...this.filters,
      };
    },
  },
};
</script>
