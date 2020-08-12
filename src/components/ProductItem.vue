<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: {id: product.id} }"
    >
      <img
        :src="product.img"
        :alt="product.name"
      >
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>
    <ProductColors :colors="product.colors" />
  </li>
</template>
<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';

export default {
  name: 'ProductItem',
  components: {
    ProductColors,
  },
  filters: {
    numberFormat,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentColor: this.product.colors[0],
    };
  },
  methods: {
    gotoPage,
    numberFormat,
  },
};
</script>
