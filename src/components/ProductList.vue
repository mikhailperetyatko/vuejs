<template>
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
</template>
<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
