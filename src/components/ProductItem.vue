<template>
<li class="catalog__item">
  <a class="catalog__pic" href="#" @click.prevent="gotoPage('productPage', {id: product.id})">
    <img :src="product.img" :alt="product.name">
  </a>
  <h3 class="catalog__title">
    <a href="#">
      {{ product.name }}
    </a>
  </h3>
  <span class="catalog__price">
    {{ numberFormat(product.price) }} ₽
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
  props: [
    'product',
  ],
  data() {
    return {
      currentColor: this.product.colors[0],
    };
  },
  methods: {
    gotoPage,
    numberFormat,
  },
  components: {
    ProductColors,
  },
};
</script>
