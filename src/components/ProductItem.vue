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
    <fieldset class="form__block">
      <legend class="form__legend">
        Цвет:
      </legend>
      <ProductColors
        :colors="product.colors"
        :color-checked.sync="currentColor"
      />
    </fieldset>
    <b v-if="productExistsInCart">
      Товар в
      <router-link
        :to="{ name: 'cart' }"
      >
        Козине
      </router-link>
    </b>
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
      currentColor: '',
    };
  },
  computed: {
    productExistsInCart() {
      return this.$store.state.cartProducts.find((item) => item.productId === this.product.id);
    },
  },
  watch: {
    currentColor() {
      this.addToCart();
    },
  },
  methods: {
    gotoPage,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        {
          productId: this.product.id,
          amount: 1,
          color: this.currentColor,
        },
      );
    },
  },
};
</script>
