<template>
  <Spinner
    v-if="loading"
  />
  <div
    v-else-if="loadingErrors"
  >
    Произошла ошибка при загрузке товаров
    <button @click="$emit('reloadProductList')">
      Пропробовать еще раз
    </button>
  </div>
  <div v-else>
    <ul
      v-if="products.length"
      class="catalog__list"
    >
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>
    <div v-else>
      Товаров не найдено! Уточните запрос.
    </div>
  </div>
</template>
<script>
import ProductItem from '@/components/ProductItem.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
    Spinner,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingErrors: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
